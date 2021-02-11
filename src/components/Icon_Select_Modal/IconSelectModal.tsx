import { Modal, Tabs } from "antd";
import React, { ReactNode, useEffect, useState } from "react";
import * as Icon from "@ant-design/icons";
import "./icon_select_modal.style.scss";
import classNames from "classnames";
import { PlusOutlined } from "@ant-design/icons";

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
  defaultValue?: string;
  onOk: (value: string) => void;
  onCancel: () => void;
}

const { TabPane } = Tabs;

//图标选择弹框组件
export const IconSelectModal: React.FC<modalProps> = ({
  visible,
  defaultValue,
  onOk,
  onCancel,
}) => {
  const [selectedItem, setSelected] = useState("");
  const onSelected = (item: string) => {
    setSelected(selectedItem === item ? "" : item);
  };
  useEffect(() => {
    if (defaultValue) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);
  return (
    <Modal
      width="870px"
      className="icon-select-modal"
      title="图标库"
      visible={visible}
      onOk={() => onOk(selectedItem)}
      onCancel={() => onCancel()}
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
                    <div
                      className={classNames("icon-item", {
                        active: item === selectedItem,
                      })}
                      key={item}
                      onClick={() => {
                        onSelected(item);
                      }}
                    >
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

interface IconSelectPropTypes {
  onChange?: (value: string) => void;
  value?: string;
}

interface IconSelectStateTypes {
  visible: boolean;
  selected: string;
}

//图标选择弹框组件封装显示效果
export class IconSelect extends React.Component<
  IconSelectPropTypes,
  IconSelectStateTypes
> {
  constructor(props: IconSelectPropTypes) {
    super(props);
    this.state = { visible: false, selected: "" };
  }

  onSelect = () => {};

  onOk = (value: string) => {
    this.setState({ visible: false, selected: value });
    this.selectedChange(value);
  };

  onCancel = () => {
    this.setState({ visible: false });
  };

  selectedChange = (changeValue: string) => {
    if (this.props.onChange) {
      this.props.onChange(changeValue);
    }
  };

  componentDidMount() {
    if (this.props.value) {
      this.setState({ selected: this.props.value });
    }
  }

  render() {
    let render: ReactNode = <></>;
    if (this.state.selected) {
      render = React.createElement(Icon[this.state.selected]);
    } else {
      render = <PlusOutlined />;
    }
    return (
      <>
        <div
          className="icon-select"
          onClick={() => this.setState({ visible: true })}
        >
          {render}
        </div>
        <IconSelectModal
          visible={this.state.visible}
          defaultValue={this.state.selected}
          onOk={this.onOk}
          onCancel={this.onCancel}
        ></IconSelectModal>
      </>
    );
  }
}
