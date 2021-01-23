import { treeList } from "@/api/system/menu";
import { Button, Tree } from "antd";
import React from "react";
import "./styles/menu.style.scss";
const { TreeNode } = Tree;

class Menu extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = { menu: [] };
  }

  //递归处理数据
  loop = (arr: Array<object>) => {
    return arr.map((item: any) => {
      return (
        <TreeNode title={<span>{item.name}</span>} key={item.id}>
          {item.children && item.children.length > 0
            ? this.loop(item.children)
            : null}
        </TreeNode>
      );
    });
  };

  getTreeList = () => {
    treeList().then((res) => {
      this.setState({
        menu: res.data,
      });
    });
  };

  componentDidMount() {
    this.getTreeList();
  }

  render() {
    return (
      <div className="system-menu-view">
        <Tree>{this.loop(this.state.menu)}</Tree>
        <Button>添加菜单</Button>
      </div>
    );
  }
}

export default Menu;
