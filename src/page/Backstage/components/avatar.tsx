import { me } from "@/api/auth/auth";
import { loginoutType, UserLoginout } from "@/store/actions/login.action";
import { Dropdown, Menu } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import React from "react";
import { connect } from "react-redux";
import "./style/avatar.style.scss";

interface VAvatarPropTypes {
  mode?: string;
  loginout: (action: loginoutType) => void;
}

class VAvatar extends React.Component<VAvatarPropTypes, any> {
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

  menu = () => {
    return (
      <Menu>
        <Menu.Item onClick={() => this.props.loginout(UserLoginout())}>
          注销
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    return (
      <div className="vavatar-box">
        <Dropdown overlay={this.menu} placement="bottomCenter">
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

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    loginout: (action: loginoutType) => {
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(VAvatar);
