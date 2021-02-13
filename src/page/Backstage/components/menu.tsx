import { backstageRouterTree } from "@/data/backstage.router";
import { deepCopy } from "@/utils/utils";
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import "./style/menu.style.scss";

interface VMenuPropTypes {
  toggle: () => void;
  collapsed: boolean;
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
          <SubMenu title={i.name} key={i.path} icon={<MenuOutlined />}>
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
        <div
          className={classNames("toggle-menu", {
            "toggle-menu-collapsed": this.props.collapsed,
          })}
          onClick={this.toggle}
        >
          <MenuOutlined />
        </div>
        <Menu className="v-menu-style" mode="inline">
          {this.handleRenderMenuItem(backstageRouterTree, "/backstage")}
        </Menu>
      </div>
    );
  }
}

export default VMemu;
