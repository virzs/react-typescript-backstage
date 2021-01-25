import { treeList } from "@/api/system/menu";
import { Button, Tree } from "antd";
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
        <div className="handler-box">
          <Button>添加</Button>
          <Button>编辑</Button>
          <Button>删除</Button>
        </div>
        <div className="content-box">
          <div className="menu-tree">
            <Tree
              titleRender={(nodeData: any) => {
                return `${nodeData.name}`;
              }}
              treeData={this.state.menu}
            ></Tree>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
