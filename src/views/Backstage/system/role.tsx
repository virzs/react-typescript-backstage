import { getList } from "@/api/system/role";
import { Button, Card, Input } from "antd";
import { Form, List } from "antd";
import dayjs from "dayjs";
import React from "react";
import classnames from "classnames";
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
    this.state = { role: [], roleLoading: true, activeRole: {} };
  }

  roleList = () => {
    getList().then((res) => {
      this.setState({ role: res.data, roleLoading: false });
      if (res.data.length > 0 && !this.state.activeRole.id) {
        this.setState({ activeRole: res.data[0] });
      }
    });
  };

  //列表显示当前选中的角色
  findActive = (id: string): boolean => {
    const role = this.state.activeRole;
    return role.id === id ? true : false;
  };

  componentDidMount() {
    this.roleList();
  }

  render() {
    return (
      <div className="system-role-view">
        <div className="content-box">
          <Card
            title="角色列表"
            size="small"
            extra={
              <Button type="primary" size="small">
                添加
              </Button>
            }
            className="role-list"
          >
            <List
              className="list"
              bordered={false}
              size="small"
              loading={this.state.roleLoading}
              dataSource={this.state.role}
              renderItem={(item: any) => (
                <List.Item
                  className={classnames("role-item", {
                    active: this.findActive(item.id),
                  })}
                >
                  {item.name}
                </List.Item>
              )}
            ></List>
          </Card>
          <div className="main-content">
            <Card
              title="角色信息"
              extra={
                <>
                  <Button size="small">编辑</Button>
                  <Button danger size="small">
                    删除
                  </Button>
                </>
              }
              size="small"
              loading={this.state.roleLoading}
            >
              <p>
                角色名称：<span>{this.state.activeRole.name}</span>
              </p>
              <p>
                角色描述：<span>{this.state.activeRole.remark}</span>
              </p>
              <p>
                创建时间：
                <span>
                  {dayjs(this.state.activeRole.createTime).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </span>
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default Role;
