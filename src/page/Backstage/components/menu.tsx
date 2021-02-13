import { backstageRouterTree } from "@/data/backstage.router";
import { deepCopy } from "@/utils/utils";
import * as Icon from "@ant-design/icons";
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
  toggle = () => {
    this.props.toggle();
  };
  componentDidMount() {}
  handleRenderMenuItem(routes: any) {
    let routesList = deepCopy(routes);
    return routesList.map((i: any) => {
      let icon = React.createElement(Icon[i.icon || "MenuOutlined"], {
        key: i.path,
      });
      let path = `/backstage${i.path}`;
      if (i.children) {
        return (
          <SubMenu title={i.name} key={path} icon={icon}>
            {this.handleRenderMenuItem(i.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={path} icon={icon}>
          <Link to={`${path}`}>{i.name}</Link>
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
          {this.handleRenderMenuItem(backstageRouterTree)}
        </Menu>
      </div>
    );
  }
}

export default VMemu;
