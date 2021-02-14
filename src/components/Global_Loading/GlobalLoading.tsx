import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import "./globalLoading.style.scss";

export const GlobalLoading: React.FC = () => {
  return (
    <div className="global-loading">
      <Spin indicator={<LoadingOutlined spin />} />
      <p>正在加载资源....</p>
    </div>
  );
};
