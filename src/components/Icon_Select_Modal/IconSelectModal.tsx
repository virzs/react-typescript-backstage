import { Modal, Tabs } from "antd";
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
  "VerticalAlignBottomOutlined",
  "ForwardOutlined",
  "BackwardOutlined",
  "RollbackOutlined",
  "EnterOutlined",
  "RetweetOutlined",
  "SwapOutlined",
  "SwapLeftOutlined",
  "SwapRightOutlined",
  "ArrowUpOutlined",
  "ArrowDownOutlined",
  "ArrowLeftOutlined",
  "ArrowRightOutlined",
  "PlayCircleOutlined",
  "UpSquareOutlined",
  "DownSquareOutlined",
  "LeftSquareOutlined",
  "RightSquareOutlined",
  "LoginOutlined",
  "LogoutOutlined",
  "MenuFoldOutlined",
  "MenuUnfoldOutlined",
  "BorderBottomOutlined",
  "BorderHorizontalOutlined",
  "BorderInnerOutlined",
  "BorderOuterOutlined",
  "BorderLeftOutlined",
  "BorderRightOutlined",
  "BorderTopOutlined",
  "BorderVerticleOutlined",
  "PicCenterOutlined",
  "PicLeftOutlined",
  "PicRightOutlined",
  "RadiusBottomleftOutlined",
  "RadiusBottomrightOutlined",
  "RadiusUpleftOutlined",
  "RadiusUprightOutlined",
  "FullscreenOutlined",
  "FullscreenExitOutlined",
];

const OutlinedPromptIcon: string[] = [
  "QuestionOutlined",
  "QuestionCircleOutlined",
  "PlusOutlined",
  "PlusCircleOutlined",
  "PauseOutlined",
  "PauseCircleOutlined",
  "MinusOutlined",
  "MinusCircleOutlined",
  "PlusSquareOutlined",
  "MinusSquareOutlined",
  "InfoOutlined",
  "InfoCircleOutlined",
  "ExclamationOutlined",
  "ExclamationCircleOutlined",
  "CloseOutlined",
  "CloseCircleOutlined",
  "CloseSquareOutlined",
  "CheckOutlined",
  "CheckCircleOutlined",
  "CheckSquareOutlined",
  "ClockCircleOutlined",
  "WarningOutlined",
  "IssuesCloseOutlined",
  "StopOutlined",
];

const OutlinedEditorIcon: string[] = [
  "EditOutlined",
  "FormOutlined",
  "CopyOutlined",
  "ScissorOutlined",
  "DeleteOutlined",
  "SnippetsOutlined",
  "DiffOutlined",
  "HighlightOutlined",
  "AlignCenterOutlined",
  "AlignLeftOutlined",
  "AlignRightOutlined",
  "BgColorsOutlined",
  "BoldOutlined",
  "ItalicOutlined",
  "UnderlineOutlined",
  "StrikethroughOutlined",
  "RedoOutlined",
  "UndoOutlined",
  "ZoomInOutlined",
  "ZoomOutOutlined",
  "FontColorsOutlined",
  "FontSizeOutlined",
  "LineHeightOutlined",
  "DashOutlined",
  "SmallDashOutlined",
  "SortAscendingOutlined",
  "SortDescendingOutlined",
  "DragOutlined",
  "OrderedListOutlined",
  "UnorderedListOutlined",
  "RadiusSettingOutlined",
  "ColumnWidthOutlined",
  "ColumnHeightOutlined",
];

const OutlinedDataIcon: string[] = [
  "AreaChartOutlined",
  "PieChartOutlined",
  "BarChartOutlined",
  "DotChartOutlined",
  "LineChartOutlined",
  "RadarChartOutlined",
  "HeatMapOutlined",
  "FallOutlined",
  "RiseOutlined",
  "StockOutlined",
  "BoxPlotOutlined",
  "FundOutlined",
  "SlidersOutlined",
];

const tabPane: { name: string; value: string[] }[] = [
  { name: "方向性", value: OutlinedDirectionIcon },
  { name: "提示性", value: OutlinedPromptIcon },
  { name: "编辑类", value: OutlinedEditorIcon },
  { name: "数据类", value: OutlinedDataIcon },
];

interface modalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}

const { TabPane } = Tabs;

export const IconSelectModal: React.FC<modalProps> = ({
  visible,
  onOk,
  onCancel,
}) => {
  return (
    <Modal
      width="870px"
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
      <Tabs tabPosition="left" size="small">
        {tabPane.map((item: { name: string; value: string[] }) => {
          return (
            <TabPane
              tab={
                <>
                  {React.createElement(Icon[item.value[0]])}
                  {item.name}
                </>
              }
              key={item.name}
            >
              <div className="icon-box">
                {item.value.map((item: string) => {
                  return (
                    <div className="icon-item" key={item}>
                      {React.createElement(Icon[item], {
                        key: item,
                        style: { fontSize: "24px" },
                      })}
                      <div className="scroll-box">
                        <p className="scroll-content">
                          <span>{item}</span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabPane>
          );
        })}
      </Tabs>
    </Modal>
  );
};
