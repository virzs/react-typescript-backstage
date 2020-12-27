import { Button, Card, Input, message } from "antd";
import Form from "antd/lib/form/Form";
import FormItem from "antd/lib/form/FormItem";
import React from "react";
import "./style/login.style.scss";
import { login as loginApi } from "@/api/auth/auth";
import { UserLogin } from "@/store/actions/user.action";
import { connect } from "react-redux";

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
    console.log("props", this.props);
    loginApi(this.state.loginForm).then((res: any) => {
      message.success(res.msg);
      const action = UserLogin(res.data);
      this.props.sendAction(action);
      this.props.history.goBack();
    });
  };
  changeLogin = (data: object, all: object) => {
    this.setState({ loginForm: all });
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
    sendAction: (action: any) => {
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
