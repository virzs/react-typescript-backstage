import { getList } from "@/api/system/role";
import { Button, Input } from "antd";
import { Form, List } from "antd";
import React from "react";
import "./styles/role.scss";

const RoleFrom = () => {
  return (
    <Form>
      <Form.Item label="角色名称" name="name">
        <Input></Input>
      </Form.Item>
      <Form.Item label="角色描述" name="remark">
        <Input></Input>
      </Form.Item>
    </Form>
  );
};

class Role extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { role: [], roleLoading: true };
  }

  roleList = () => {
    getList().then((res) => {
      this.setState({ role: res.data, roleLoading: false });
    });
  };

  componentDidMount() {
    this.roleList();
  }

  render() {
    return (
      <div className="system-role-view">
        <div className="handler-box">
          <Button>添加</Button>
          <Button>编辑</Button>
          <Button>删除</Button>
        </div>
        <div className="content-box">
          <div className="role-list">
            <List
              className="list"
              bordered
              size="small"
              loading={this.state.roleLoading}
              dataSource={this.state.role}
              renderItem={(item: any) => <List.Item>{item.name}</List.Item>}
            ></List>
          </div>
          <div>
            <RoleFrom></RoleFrom>
          </div>
        </div>
      </div>
    );
  }
}
export default Role;
