import { detail, treeList } from "@/api/system/menu";
import { Button, Card, Tree } from "antd";
import dayjs from "dayjs";
import React from "react";
import "./styles/menu.style.scss";

class Menu extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = { menu: [], detail: {} };
  }

  //递归处理数据
  loop = (arr: Array<object>): any => {
    return arr.map((item: any) => {
      item.key = item.id;
      return item.children && item.children.length > 0
        ? { ...item, children: this.loop(item.children) }
        : item;
    });
  };

  //获取树形列表
  getTreeList = () => {
    treeList().then((res) => {
      let menu = this.loop(res.data);
      let detail = this.state.detail;
      this.setState({
        menu,
        detail: Object.keys(detail).length > 0 ? detail : menu[0],
      });
    });
  };

  //获取详情
  getDetail = (id: string) => {
    detail(id).then((res) => {
      this.setState({ detail: res.data });
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
            className="menu-tree"
            title="菜单列表"
            size="small"
            extra={
              <Button size="small" type="primary">
                添加
              </Button>
            }
          >
            <Tree
              titleRender={(nodeData: any) => {
                return `${nodeData.name}`;
              }}
              treeData={this.state.menu}
            ></Tree>
          </Card>
          <div className="content-box">
            <Card
              className="menu-box"
              title="菜单信息"
              size="small"
              extra={
                <>
                  <Button size="small">编辑</Button>
                  <Button size="small" danger>
                    删除
                  </Button>
                </>
              }
            >
              <p>菜单名称：{this.state.detail.name}</p>
              <p>菜单别名：{this.state.detail.alias}</p>
              <p>菜单路径：{this.state.detail.path}</p>
              <p>菜单备注：{this.state.detail.remark}</p>
              <p>
                创建时间：
                {dayjs(this.state.detail.createTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </p>
            </Card>
            <Card title="菜单按钮" size="small"></Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
