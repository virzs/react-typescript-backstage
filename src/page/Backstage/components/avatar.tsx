import { me } from "@/api/auth/auth";
import { Dropdown, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { Link } from "react-router-dom";
import "./style/avatar.style.scss";

interface VAvatarPropTypes {
  mode?: string;
}

const menu = () => {
  return (
    <Menu>
      <Menu.Item>
        <Link to="">注销</Link>
      </Menu.Item>
    </Menu>
  );
};

export default class VAvatar extends React.Component<VAvatarPropTypes, any> {
  constructor(props: VAvatarPropTypes) {
    super(props);
    this.state = {
      avatarSrc: "",
    };
  }
  componentDidMount() {
    this.getMe();
  }
  getMe = () => {
    me().then((res) => {
      this.setState({ avatarSrc: res.data.avatar });
    });
  };
  render() {
    return (
      <div className="vavatar-box">
        <Dropdown overlay={menu} placement="bottomCenter">
          <Avatar
            shape="square"
            size="small"
            src={this.state.avatarSrc}
          ></Avatar>
        </Dropdown>
      </div>
    );
  }
}
