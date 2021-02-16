import { create, detail, update, treeList, del } from "@/api/system/menu";
import { IconSelect } from "@/components/Icon_Select_Modal/IconSelectModal";
import { loop } from "@/utils/utils";
import * as Icon from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Switch,
  Tree,
  TreeSelect,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import "./styles/menu.style.scss";

interface menuFormValues {
  id?: string;
  name: string;
  alias?: string;
  icon?: string;
  path: string;
  remark?: string;
  code: string;
  hidden: number;
  sort: number;
  parentId: string;
}

interface menuFormProps {
  visible: boolean;
  onSubmit: (values: menuFormValues) => void;
  onCancel: () => void;
  type?: string;
  defaultValue?: menuFormValues;
  treeData: menuFormValues[];
}

const { confirm } = Modal;

const MenuForm: React.FC<menuFormProps> = ({
  visible,
  onSubmit,
  onCancel,
  type = "add",
  defaultValue,
  treeData,
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
      title={`${type === "add" ? "新增" : "编辑"}菜单`}
      okText="保存"
      cancelText="取消"
      cancelButtonProps={{ size: "small" }}
      okButtonProps={{ size: "small" }}
      onCancel={onCancel}
      onOk={() => {
        form.validateFields().then((values) => {
          onSubmit(values);
        });
      }}
    >
      <Form form={form} size="small" name="menu_form_in_modal">
        <Form.Item label="上级菜单" name="parentId">
          <TreeSelect
            placeholder="请选择上级菜单"
            treeData={loop(treeData, { title: "name", value: "id" })}
            allowClear
          ></TreeSelect>
        </Form.Item>
        <Form.Item
          label="菜单名称"
          name="name"
          rules={[{ required: true, message: "菜单名称不能为空" }]}
        >
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item label="菜单别名" name="alias">
          <Input placeholder="请输入菜单别名" />
        </Form.Item>
        <Form.Item label="菜单图标" name="icon">
          <IconSelect></IconSelect>
        </Form.Item>
        <Form.Item
          label="菜单路径"
          name="path"
          rules={[{ required: true, message: "菜单路径不能为空" }]}
        >
          <Input placeholder="请输入菜单路径" />
        </Form.Item>
        <Form.Item
          label="菜单编号"
          name="code"
          rules={[{ required: true, message: "菜单编号不能为空" }]}
        >
          <Input placeholder="请输入菜单编号" />
        </Form.Item>
        <Form.Item
          label="菜单排序"
          name="sort"
          rules={[{ required: true, message: "菜单排序不能为空" }]}
        >
          <InputNumber min={0} />
        </Form.Item>
        <Form.Item label="是否隐藏" name="hidden" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="菜单描述" name="remark">
          <TextArea
            placeholder="请输入菜单描述"
            role="3"
            maxLength={100}
            showCount
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

class Menu extends React.Component<null, any> {
  constructor(props: null) {
    super(props);
    this.state = {
      menu: [],
      detail: {},
      type: "add",
      visible: false,
      treeLoading: true,
      detailLoading: true,
      iconVisible: false,
    };
  }

  //获取树形列表
  getTreeList = () => {
    treeList().then((res) => {
      //多次递归处理数据性能较差，loop函数为通用方法
      let menu = loop(res.data, { key: "id" });
      const setIcon = (list: any[]): any[] => {
        return list.map((item: any) => {
          item.icon = React.createElement(Icon[item.icon]);
          return item.children && item.children.length > 0
            ? { ...item, children: setIcon(item.children) }
            : item;
        });
      };
      menu = setIcon(menu);
      let detail = this.state.detail;
      if (menu[0]) {
        menu[0].hidden = menu[0].hidden === 0 ? false : true;
      }
      this.setState({
        menu,
        detail: detail ? detail : menu[0],
        treeLoading: false,
        detailLoading: false,
      });
    });
  };

  //获取详情
  getDetail = (id: string) => {
    this.setState({ detailLoading: true });
    detail(id).then((res) => {
      res.data.hidden = res.data.hidden === 0 ? false : true;
      this.setState({ detail: res.data, detailLoading: false });
    });
  };

  //表单取消
  modalCancel = () => {
    this.setState({ visible: false });
  };

  //表单提交
  modalSubmit = (values: menuFormValues) => {
    const handler = () => {
      this.modalCancel();
      this.getTreeList();
    };
    if (this.state.type === "add") {
      values.hidden = values.hidden ? 1 : 0;
      create(values).then(() => {
        message.success("添加成功");
        handler();
      });
    } else {
      const data = { ...this.state.detail, ...values };
      data.hidden = data.hidden ? 1 : 0;
      update(data).then(() => {
        message.success("修改成功");
        this.getDetail(data.id);
        handler();
      });
    }
  };

  //选择菜单
  treeSelect = (keys: any) => {
    const key = keys[0];
    this.getDetail(key);
  };

  //删除菜单
  delMenu = () => {
    confirm({
      title: "是否删除此菜单？",
      content: "当前菜单下存在子菜单是无法删除",
      okButtonProps: { size: "small" },
      cancelButtonProps: { size: "small" },
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        return new Promise((resolve, reject) => {
          del(this.state.detail.id)
            .then((res) => {
              message.success("删除成功");
              this.setState({ detail: {} });
              this.getTreeList();
              resolve(true);
            })
            .catch((err) => {
              reject(false);
            });
        });
      },
    });
  };

  componentDidMount() {
    this.getTreeList();
  }

  render() {
    return (
      <div className="system-menu-view">
        <div className="content-box">
          <Card
            loading={this.state.treeLoading}
            className="menu-tree"
            title="菜单列表"
            size="small"
            extra={
              <Button
                size="small"
                type="primary"
                onClick={() => this.setState({ visible: true, type: "add" })}
              >
                添加
              </Button>
            }
          >
            {this.state.menu.length > 0 ? (
              <Tree
                showIcon
                showLine
                titleRender={(nodeData: any) => {
                  return `${nodeData.name}`;
                }}
                treeData={this.state.menu}
                defaultSelectedKeys={[
                  this.state.detail ? this.state.detail.id : "",
                ]}
                onSelect={this.treeSelect}
              ></Tree>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Card>
          <div className="content-box">
            <Card
              loading={this.state.detailLoading}
              className="menu-box"
              title="菜单信息"
              size="small"
              extra={
                <>
                  <Button
                    size="small"
                    onClick={() =>
                      this.setState({ type: "edit", visible: true })
                    }
                  >
                    编辑
                  </Button>
                  <Button size="small" danger onClick={this.delMenu}>
                    删除
                  </Button>
                </>
              }
            >
              {this.state.detail ? (
                <>
                  <p>菜单名称：{this.state.detail.name}</p>
                  <p>菜单别名：{this.state.detail.alias}</p>
                  <p>菜单路径：{this.state.detail.path}</p>
                  <p>菜单备注：{this.state.detail.remark}</p>
                  <p>是否隐藏：{this.state.detail.hidden ? "是" : "否"}</p>
                  <p>
                    创建时间：
                    {dayjs(this.state.detail.createTime).format(
                      "YYYY-MM-DD HH:mm:ss"
                    )}
                  </p>
                </>
              ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              )}
            </Card>
            <Card title="菜单按钮" size="small"></Card>
          </div>
        </div>
        <MenuForm
          visible={this.state.visible}
          type={this.state.type}
          defaultValue={this.state.detail}
          treeData={this.state.menu}
          onCancel={this.modalCancel}
          onSubmit={this.modalSubmit}
        ></MenuForm>
      </div>
    );
  }
}

export default Menu;
