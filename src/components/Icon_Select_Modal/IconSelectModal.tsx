import { Modal } from "antd";
import React from "react";
import * as Icon from "@ant-design/icons";
import "./icon_select_modal.style.scss";

//线框 方向性 图标
const OutlinedDirectionIcon: string[] = [
  "StepBackwardOutlined",
  "StepForwardOutlined",
  "FastBackwardOutlined",
  "FastForwardOutlined",
  "ShrinkOutlined",
  "ArrowsAltOutlined",
  "DownOutlined",
  "UpOutlined",
  "LeftOutlined",
  "RightOutlined",
  "CaretUpOutlined",
  "CaretDownOutlined",
  "CaretLeftOutlined",
  "CaretRightOutlined",
  "UpCircleOutlined",
  "DownCircleOutlined",
  "LeftCircleOutlined",
  "RightCircleOutlined",
  "DoubleRightOutlined",
  "DoubleLeftOutlined",
  "VerticalLeftOutlined",
  "VerticalRightOutlined",
  "VerticalAlignTopOutlined",
  "VerticalAlignMiddleOutlined",
];

interface modalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const IconSelectModal: React.FC<modalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      width="700px"
      className="icon-select-modal"
      title="图标库"
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      okText="确定"
      okButtonProps={{ size: "small" }}
      cancelText="取消"
      cancelButtonProps={{ size: "small" }}
    >
      <div className="icon-box">
        {OutlinedDirectionIcon.map((item: string) => {
          return (
            <div className="icon-item" key={item}>
              {React.createElement(Icon[item], {
                key: item,
                style: { fontSize: "24px" },
              })}
              <p>
                <span> {item}</span>
              </p>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};
