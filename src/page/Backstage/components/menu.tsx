import { backstageRouterTree } from "@/data/backstage.router";
import { FormatRouterList } from "@/utils/router";
import { SessionStorage } from "@/utils/storage";
import { deepCopy, getUuid } from "@/utils/utils";
import * as Icon from "@ant-design/icons";
import { MenuOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import VAvatar from "./avatar";
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
    const menu = SessionStorage.get("menu");
    this.setState({ menu: menu ? menu : backstageRouterTree });
  };
  //查找当前路由对应的菜单
  findMenuSelected = (): string[] => {
    const selected = FormatRouterList(this.state.menu).find(
      (item: any) => window.location.pathname === `/backstage${item.path}`
    );
    return selected ? [selected.id] : [];
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
            key={i.id ? i.id : getUuid()}
            icon={icon}
          >
            {this.handleRenderMenuItem(i.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={i.id ? i.id : getUuid()} icon={icon}>
          <Link to={`${path}`}>{i.name}</Link>
        </Menu.Item>
      );
    });
  }
  render() {
    return (
      <div className="v-navigation">
        <div className="v-navigation-header">
          <div
            className={classNames("toggle-menu", {
              "toggle-menu-collapsed": this.props.collapsed,
            })}
            onClick={this.toggle}
          >
            <MenuOutlined />
          </div>
        </div>
        <div className="v-navigation-content">
          <Menu
            className="v-menu-style"
            mode="inline"
            selectedKeys={this.findMenuSelected()}
          >
            {this.handleRenderMenuItem(this.state.menu)}
          </Menu>
        </div>
        <div className="v-navigation-footer">
          <Menu className="v-menu-style" mode="inline">
            <Menu.Item icon={<VAvatar />}></Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default VMemu;
