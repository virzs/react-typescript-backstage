import { add, del, getDetail, getList, update } from "@/api/system/role";
import { Button, Card, Input, message, Modal } from "antd";
import { Form, List } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import classnames from "classnames";
import "./styles/role.scss";

interface roleFormValues {
  name: string;
  remark: string;
}

interface roleFormProps {
  visible: boolean;
  readonly type: string;
  defaultValue?: roleFormValues;
  onSubmit: (values: roleFormValues) => void;
  onCancel: () => void;
}

const { confirm } = Modal;

const RoleForm: React.FC<roleFormProps> = ({
  visible,
  type = "add",
  onCancel,
  onSubmit,
  defaultValue,
}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  useEffect(() => {
    form.resetFields();
    if (defaultValue && type === "edit") form.setFieldsValue(defaultValue);
  });
  return (
    <Modal
      forceRender
      visible={visible}
      title={`${type === "add" ? "新增" : "编辑"}角色`}
      okText="保存"
      cancelText="取消"
      onCancel={onCancel}
      cancelButtonProps={{ size: "small" }}
      okButtonProps={{ size: "small" }}
      onOk={() => {
        form.validateFields().then((values) => {
          //将form传递至提交方法，异步操作后清空
          onSubmit(values);
        });
      }}
    >
      <Form
        form={form}
        size="small"
        layout="vertical"
        name="role_form_in_model"
      >
        <Form.Item
          label="角色名称"
          name="name"
          rules={[{ required: true, message: "角色名称不能为空" }]}
        >
          <Input placeholder="请输入角色名称" maxLength={30} />
        </Form.Item>
        <Form.Item label="描述" name="remark">
          <TextArea
            placeholder="请输入角色描述"
            rows={3}
            maxLength={100}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

class Role extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      role: [],
      roleLoading: true,
      activeLoading: true,
      activeRole: {},
      visible: false,
      type: "add",
    };
  }

  //获取角色列表
  roleList = () => {
    getList().then((res) => {
      this.setState({
        role: res.data,
        roleLoading: false,
        activeLoading: false,
      });
      if (res.data.length > 0 && !this.state.activeRole.id) {
        this.setState({ activeRole: res.data[0] });
      }
    });
  };

  //获取角色详情
  roleDetail = (id: string) => {
    //当左侧点击的角色和当先显示的角色相同及表单不为编辑模式时直接返回
    if (this.state.activeRole.id === id && this.state.type !== "edit") return;
    this.setState({ activeLoading: true });
    getDetail(id).then((res) => {
      const result = res.data;
      this.setState({ activeRole: result, activeLoading: false });
    });
  };

  //列表显示当前选中的角色
  findActive = (id: string): boolean => {
    const role = this.state.activeRole;
    return role.id === id ? true : false;
  };

  //模态框关闭
  modelCancel = () => {
    this.setState({ visible: false });
  };

  //模态框提交
  modelSubmit = (values: roleFormValues) => {
    const handler = () => {
      this.modelCancel();
      this.roleList();
    };
    if (this.state.type === "add") {
      add(values).then((res) => {
        message.success("添加成功");
        handler();
      });
    } else {
      const data = { ...this.state.activeRole, ...values };
      update(data).then((res) => {
        message.success("编辑成功");
        this.roleDetail(data.id);
        handler();
      });
    }
  };

  //删除角色
  delRole = () => {
    confirm({
      title: "是否删除此角色？",
      content: "当前角色关联的用户将失去当前角色的所有权限",
      okButtonProps: { size: "small" },
      okText: "确认",
      cancelText: "取消",
      cancelButtonProps: { size: "small" },
      onOk: () => {
        return new Promise((resolve, reject) => {
          del(this.state.activeRole.id)
            .then((res) => {
              this.setState({ activeRole: {} });
              message.success("删除角色成功");
              this.roleList();
              resolve(true);
            })
            .catch((err) => {
              reject(false);
            });
        });
      },
      onCancel: () => {},
    });
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
              <Button
                type="primary"
                size="small"
                onClick={() => this.setState({ visible: true, type: "add" })}
              >
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
                  onClick={() => this.roleDetail(item.id)}
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
                  <Button
                    size="small"
                    onClick={() =>
                      this.setState({ visible: true, type: "edit" })
                    }
                  >
                    编辑
                  </Button>
                  <Button danger size="small" onClick={this.delRole}>
                    删除
                  </Button>
                </>
              }
              size="small"
              loading={this.state.activeLoading}
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
        <RoleForm
          visible={this.state.visible}
          type={this.state.type}
          defaultValue={this.state.activeRole}
          onCancel={this.modelCancel}
          onSubmit={this.modelSubmit}
        ></RoleForm>
      </div>
    );
  }
}
export default Role;
