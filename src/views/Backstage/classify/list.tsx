import { getTreeList } from "@/api/article/classify/classify";
import { Table } from "antd";
import React from "react";
import dayJs from "dayjs";

class List extends React.Component<any, any> {
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
      ],
      loading: false,
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

  render() {
    return (
      <div className="classify-list-page">
        <Table
          loading={this.state.loading}
          pagination={false}
          bordered={true}
          size="small"
          dataSource={this.state.data}
          columns={this.state.colums}
          rowKey="id"
        ></Table>
      </div>
    );
  }
}
export default List;
