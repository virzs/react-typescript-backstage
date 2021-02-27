import { Button, Card, Input, message } from "antd";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React from "react";
import "./style/login.style.scss";
import { login as loginApi } from "@/api/auth/auth";
import { UserLogin } from "@/store/actions/login.action";
import { connect } from "react-redux";
import { treeList } from "@/api/system/menu";
import { SessionStorage } from "@/utils/storage";

export interface result {
  code: number;
  msg: string;
  data: object;
}

class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      loginForm: {
        account: "",
        password: "",
      },
    };
  }
  submitLogin = () => {
    loginApi(this.state.loginForm).then((res: any) => {
      message.success(res.msg);
      this.props.login(res.data);
      this.getMenu();
    });
  };
  changeLogin = (data: object, all: object) => {
    this.setState({ loginForm: all });
  };
  //登陆后获取后台的菜单存储到session中
  getMenu = () => {
    treeList().then((res) => {
      SessionStorage.set("menu", res.data);
      this.props.history.goBack();
    });
  };
  render() {
    return (
      <div className="login-page">
        <Card>
          <Form
            name="login-form"
            onFinish={this.submitLogin}
            onValuesChange={this.changeLogin}
          >
            <FormItem label="账号" name="account">
              <Input placeholder="请输入账号" />
            </FormItem>
            <FormItem label="密码" name="password">
              <Input.Password placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: (arg0: any) => void) => {
  return {
    login: (info: any) => {
      dispatch(UserLogin(info));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
