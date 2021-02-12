import { backstageRouterTree } from "@/data/backstage.router";
import { deepCopy } from "@/utils/utils";
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { Link } from "react-router-dom";
import "./style/menu.style.scss";

interface VMenuPropTypes {
  toggle: () => void;
}

class VMemu extends React.Component<VMenuPropTypes, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: VMenuPropTypes) {
    super(props);
  }
  toggle = () => {
    this.props.toggle();
  };
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
      <div className="v-menu">
        <div className="toggle-menu" onClick={this.toggle}>
          <MenuOutlined />
        </div>
        <Menu mode="inline">
          {this.handleRenderMenuItem(backstageRouterTree, "/backstage")}
        </Menu>
      </div>
    );
  }
}

export default VMemu;
