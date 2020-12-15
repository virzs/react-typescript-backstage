import { backstageRoutes } from "@/router/router";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { Link } from "react-router-dom";

class VMemu extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {}
  handleRenderMenuItem(routes: any, parentPath: string | null = null) {
    return routes.map((i: any) => {
      i.path = parentPath ? `${i.path}` : i.path;
      console.log(i.children);
      if (i.children) {
        return (
          <SubMenu title={i.name} key={i.path}>
            {this.handleRenderMenuItem(i.children, i.path)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={i.path}>
          <Link to={`/backstage${i.path}`}>{i.name}</Link>
        </Menu.Item>
      );
    });
  }
  render() {
    return <Menu mode="inline">{this.handleRenderMenuItem(backstageRoutes)}</Menu>;
  }
}

export default VMemu;
