import { backstageRouterTree } from "@/data/backstage.router";
import { deepCopy } from "@/utils/utils";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { Link } from "react-router-dom";

class VMemu extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
    this.state = { collapsed: true };
  }
  componentDidMount() {}
  handleRenderMenuItem(routes: any, parentPath: string | null = null) {
    let routesList = deepCopy(routes);
    return routesList.map((i: any) => {
      i.path = parentPath ? `${parentPath}${i.path}` : i.path;
      if (i.children) {
        return (
          <SubMenu title={i.name} key={i.path}>
            {this.handleRenderMenuItem(i.children, i.path)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={i.path}>
          <Link to={`${i.path}`}>{i.name}</Link>
        </Menu.Item>
      );
    });
  }
  render() {
    return (
      <Menu mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
        {this.handleRenderMenuItem(backstageRouterTree, "/backstage")}
      </Menu>
    );
  }
}

export default VMemu;
