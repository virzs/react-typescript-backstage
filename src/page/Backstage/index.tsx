import { Card, Layout } from "antd";
import React from "react";
import VMemu from "./components/menu";
import "./style/backstage.style.scss";

const { Header, Sider, Content } = Layout;
class Backstage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <Layout className="backstage-page">
        {/* 顶栏 */}
        <Header className="backstage-header"></Header>
        <Layout>
          {/* 侧边栏 */}
          <Sider>
            <VMemu></VMemu>
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
