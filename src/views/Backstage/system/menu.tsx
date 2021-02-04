import { treeList } from "@/api/system/menu";
import { Button, Card, Tree } from "antd";
import React from "react";
import "./styles/menu.style.scss";

class Menu extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = { menu: [] };
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

  getTreeList = () => {
    treeList().then((res) => {
      let menu = this.loop(res.data);
      console.log(menu);
      this.setState({
        menu,
      });
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
            ></Card>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
