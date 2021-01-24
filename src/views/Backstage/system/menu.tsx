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
        <Tree
          titleRender={(nodeData: any) => {
            return `${nodeData.name}`;
          }}
          treeData={this.state.menu}
        ></Tree>
        <Button>添加菜单</Button>
      </div>
    );
  }
}

export default Menu;
