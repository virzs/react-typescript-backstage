import { Card, Layout } from "antd";
import React from "react";
import VAvatar from "./components/avatar";
import VMemu from "./components/menu";
import "./style/backstage.style.scss";

const { Header, Sider, Content } = Layout;
class Backstage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { collapsed: true };
  }
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };
  componentDidMount() {}
  render() {
    return (
      <Layout className="backstage-page">
        {/* 顶栏 */}
        <Header className="backstage-header">
          <VAvatar></VAvatar>
        </Header>
        <Layout>
          {/* 侧边栏 */}
          <Sider
            theme="light"
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <VMemu toggle={() => this.toggle()}></VMemu>
          </Sider>
          {/* 内容 */}
          <Content className="backstage-content">
            <Card>{this.props.children}</Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Backstage;
