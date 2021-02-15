import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import "./LocalLoading.style.scss";

export const LocalLoading: React.FC = () => {
  return (
    <div className="global-loading">
      <Spin indicator={<LoadingOutlined spin />} />
      <p>正在加载，请稍后....</p>
    </div>
  );
};
