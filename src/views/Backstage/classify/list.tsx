import { add, edit, getTreeList } from "@/api/article/classify/classify";
import { Button, Form, Input, message, Modal, Table } from "antd";
import React from "react";
import dayJs from "dayjs";
import { FormInstance } from "antd/lib/form";

class List extends React.Component<any, any> {
  formRef = React.createRef<FormInstance>();
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      colums: [
        {
          title: "分类名称",
          dataIndex: "name",
          key: "name",
          width: 300,
        },
        {
          title: "分类别名",
          dataIndex: "alias",
          key: "alias",
          width: 300,
        },
        {
          title: "分类描述",
          dataIndex: "introduction",
          key: "introduction",
        },
        {
          title: "分类等级",
          dataIndex: "level",
          key: "level",
          width: 100,
        },
        {
          title: "创建时间",
          dataIndex: "createTime",
          key: "createTime",
          width: 200,
        },
        {
          title: "操作",
          dataIndex: "operation",
          render: (_: any, record: any) => {
            return (
              <>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    this.addChildClassify(record.id);
                  }}
                >
                  新增子分类
                </Button>
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    this.editChildClassify(record);
                  }}
                >
                  编辑
                </Button>
                <Button size="small" type="link">
                  删除
                </Button>
              </>
            );
          },
        },
      ],
      loading: false,
      visible: false,
      classifyForm: {},
      modalTitle: "新增分类",
      modalType: "",
    };
  }

  componentDidMount() {
    this.getClassifyTreeList();
  }

  recursive(data: any) {
    const format = data.map((i: { children: any; createTime: any }) => {
      // console.log(dayJs(i.createTime).format("YYYY/MM/DD HH:mm:ss"), typeof i.createTime);
      i.createTime = dayJs(i.createTime).format("YYYY/MM/DD HH:mm:ss");
      if (!i.children || i.children.length === 0) {
        delete i.children;
      } else {
        this.recursive(i.children);
      }
      return i;
    });
    return format;
  }

  getClassifyTreeList = () => {
    this.setState({ loading: true });
    getTreeList().then((res) => {
      let list = this.recursive(res.data);
      this.setState({ data: list });
      this.setState({ loading: false });
    });
  };

  addClassify = () => {
    this.setState({ visible: true, modalTitle: "新增分类", modalType: "add" });
  };

  editChildClassify = (record: any) => {
    if (this.formRef.current) this.formRef.current.setFieldsValue(record);
    this.setState({
      visible: true,
      modalTitle: "修改分类",
      modalType: "edit",
      classifyForm: record,
    });
  };

  addChildClassify = (id: string) => {
    this.setState({ classifyForm: { parentId: id } });
    this.addClassify();
  };

  submitModal = () => {
    if (this.state.modalType === "add") {
      add(this.state.classifyForm).then((res) => {
        message.success("添加分类成功");
        this.getClassifyTreeList();
        if (this.formRef.current) this.formRef.current.resetFields();
        this.setState({ visible: false });
      });
    } else if (this.state.modalType === "edit") {
      edit(this.state.classifyForm).then((res) => {
        message.success("修改分类成功");
        this.getClassifyTreeList();
        if (this.formRef.current) this.formRef.current.resetFields();
        this.setState({ visible: false });
      });
    }
  };

  closeModal = () => {
    this.setState({ classifyForm: {} });
    if (this.formRef.current) this.formRef.current.resetFields();
    this.setState({ visible: false });
  };

  render() {
    return (
      <div className="classify-list-page">
        <Button type="primary" onClick={this.addClassify}>
          新增分类
        </Button>
        <Table
          loading={this.state.loading}
          pagination={false}
          bordered={true}
          size="small"
          dataSource={this.state.data}
          columns={this.state.colums}
          rowKey="id"
        ></Table>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          onOk={this.submitModal}
          onCancel={this.closeModal}
          forceRender={true}
        >
          <Form
            name="classify-form"
            size="small"
            ref={this.formRef}
            onValuesChange={(data: object, all: object) => {
              const form = this.state.classifyForm;
              this.setState({ classifyForm: { ...form, ...all } });
            }}
          >
            <Form.Item label="分类名称" name="name">
              <Input placeholder="请输入分类名称"></Input>
            </Form.Item>
            <Form.Item label="分类别名" name="alias">
              <Input placeholder="请输入分类别名"></Input>
            </Form.Item>
            <Form.Item label="分类描述" name="introduction">
              <Input.TextArea
                autoSize={{ minRows: 3 }}
                showCount={true}
                maxLength={100}
                placeholder="请输入分类描述"
              ></Input.TextArea>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default List;
