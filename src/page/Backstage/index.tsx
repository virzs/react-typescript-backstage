import { Card, Layout } from "antd";
import React from "react";
import { ContentHeader } from "./components/contentHeader";
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
        <Layout>
          {/* 侧边栏 */}
          <Sider
            className="backstage-sider"
            theme="light"
            collapsedWidth={44}
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <VMemu
              toggle={() => this.toggle()}
              collapsed={this.state.collapsed}
            ></VMemu>
          </Sider>
          {/* 内容 */}
          <Content className="backstage-content">
            <Header className="backstage-header">
              <ContentHeader />
            </Header>
            <Card>{this.props.children}</Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default Backstage;
