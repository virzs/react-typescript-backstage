import React from "react";
import { Button } from "antd";

const Index = () => {
  return (
    <div className="App-header">
      <p>主页</p>
      <Button type="primary">默认图标</Button>
      <Button type="link" href="https://blog.virs.xyz">博客</Button>
    </div>
  );
};

export default Index;
