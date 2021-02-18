import { treeList } from "@/api/system/menu";
import { backstageRouterTree } from "@/data/backstage.router";
import { deepCopy, getUuid } from "@/utils/utils";
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
  constructor(props: VMenuPropTypes) {
    super(props);
    this.state = { menu: backstageRouterTree };
  }
  toggle = () => {
    this.props.toggle();
  };
  componentDidMount() {
    this.getMenu();
  }
  getMenu = () => {
    treeList().then((res) => {
      this.setState({ menu: [...this.state.menu, ...res.data] });
    });
  };
  handleRenderMenuItem(routes: any) {
    let routesList = deepCopy(routes);
    return routesList.map((i: any) => {
      let icon = React.createElement(Icon[i.icon || "MenuOutlined"], {
        key: i.path,
      });
      let path = `/backstage${i.path}`;
      if (i.children && i.children.length > 0) {
        return (
          <SubMenu
            popupClassName="v-menu-popup-sub"
            title={i.name}
            key={i.id || getUuid()}
            icon={icon}
          >
            {this.handleRenderMenuItem(i.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={i.id || getUuid()} icon={icon}>
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
          {this.handleRenderMenuItem(this.state.menu)}
        </Menu>
      </div>
    );
  }
}

export default VMemu;
