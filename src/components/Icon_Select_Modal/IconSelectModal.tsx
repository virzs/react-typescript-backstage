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

const OutlinedBrandIcon: string[] = [
  "AndroidOutlined",
  "AppleOutlined",
  "WindowsOutlined",
  "IeOutlined",
  "ChromeOutlined",
  "GithubOutlined",
  "AliwangwangOutlined",
  "DingdingOutlined",
  "WeiboSquareOutlined",
  "WeiboCircleOutlined",
  "TaobaoCircleOutlined",
  "Html5Outlined",
  "WeiboOutlined",
  "TwitterOutlined",
  "WechatOutlined",
  "YoutubeOutlined",
  "AlipayCircleOutlined",
  "TaobaoOutlined",
  "SkypeOutlined",
  "QqOutlined",
  "MediumWorkmarkOutlined",
  "GitlabOutlined",
  "MediumOutlined",
  "LinkedinOutlined",
  "GooglePlusOutlined",
  "DropboxOutlined",
  "FacebookOutlined",
  "CodepenOutlined",
  "CodeSandboxOutlined",
  "AmazonOutlined",
  "GoogleOutlined",
  "CodepenCircleOutlined",
  "AlipayOutlined",
  "AntDesignOutlined",
  "AntCloudOutlined",
  "AliyunOutlined",
  "ZhihuOutlined",
  "SlackOutlined",
  "SlackSquareOutlined",
  "BehanceOutlined",
  "BehanceSquareOutlined",
  "DribbbleOutlined",
  "DribbbleSquareOutlined",
  "InstagramOutlined",
  "YuqueOutlined",
  "AlibabaOutlined",
  "YahooOutlined",
  "RedditOutlined",
  "SketchOutlined",
];

const OutlinedGeneralIcon: string[] = [
  "AccountBookOutlined",
  "AimOutlined",
  "AlertOutlined",
  "ApartmentOutlined",
  "ApiOutlined",
  "AppstoreAddOutlined",
  "AppstoreOutlined",
  "AudioOutlined",
  "AudioMutedOutlined",
  "AuditOutlined",
  "BankOutlined",
  "BarcodeOutlined",
  "BarsOutlined",
  "BellOutlined",
  "BlockOutlined",
  "BookOutlined",
  "BorderOutlined",
  "BorderlessTableOutlined",
  "BranchesOutlined",
  "BugOutlined",
  "BuildOutlined",
  "BulbOutlined",
  "CalculatorOutlined",
  "CalendarOutlined",
  "CameraOutlined",
  "CarOutlined",
  "CarryOutOutlined",
  "CiCircleOutlined",
  "CiOutlined",
  "ClearOutlined",
  "CloudDownloadOutlined",
  "CloudOutlined",
  "CloudServerOutlined",
  "CloudSyncOutlined",
  "CloudUploadOutlined",
  "ClusterOutlined",
  "CodeOutlined",
  "CoffeeOutlined",
  "CommentOutlined",
  "CompassOutlined",
  "CompressOutlined",
  "ConsoleSqlOutlined",
  "ContactsOutlined",
  "ContainerOutlined",
  "ControlOutlined",
  "CopyrightOutlined",
  "CreditCardOutlined",
  "CrownOutlined",
  "CustomerServiceOutlined",
  "DashboardOutlined",
  "DatabaseOutlined",
  "DeleteColumnOutlined",
  "DeleteRowOutlined",
  "DeliveredProcedureOutlined",
  "DeploymentUnitOutlined",
  "DesktopOutlined",
  "DingtalkOutlined",
  "DisconnectOutlined",
  "DislikeOutlined",
  "DollarCircleOutlined",
  "DollarOutlined",
  "DownloadOutlined",
  "EllipsisOutlined",
  "EnvironmentOutlined",
  "EuroCircleOutlined",
  "EuroOutlined",
  "ExceptionOutlined",
  "ExpandAltOutlined",
  "ExpandOutlined",
  "ExperimentOutlined",
  "ExportOutlined",
  "EyeOutlined",
  "EyeInvisibleOutlined",
  "FieldBinaryOutlined",
  "FieldNumberOutlined",
  "FieldStringOutlined",
  "FieldTimeOutlined",
  "FileAddOutlined",
  "FileDoneOutlined",
  "FileExcelOutlined",
  "FileExclamationOutlined",
  "FileOutlined",
  "FileGifOutlined",
  "FileImageOutlined",
  "FileJpgOutlined",
  "FileMarkdownOutlined",
  "FilePdfOutlined",
  "FilePptOutlined",
  "FileProtectOutlined",
  "FileSearchOutlined",
  "FileSyncOutlined",
  "FileTextOutlined",
  "FileUnknownOutlined",
  "FileWordOutlined",
  "FileZipOutlined",
  "FilterOutlined",
  "FireOutlined",
  "FlagOutlined",
  "FolderAddOutlined",
  "FolderOutlined",
  "FolderOpenOutlined",
  "FolderViewOutlined",
  "ForkOutlined",
  "FormatPainterOutlined",
  "FrownOutlined",
  "FunctionOutlined",
  "FundProjectionScreenOutlined",
  "FundViewOutlined",
  "FunnelPlotOutlined",
  "GatewayOutlined",
  "GifOutlined",
  "GiftOutlined",
  "GlobalOutlined",
  "GoldOutlined",
  "GroupOutlined",
  "HddOutlined",
  "HeartOutlined",
  "HistoryOutlined",
  "HomeOutlined",
  "HourglassOutlined",
  "IdcardOutlined",
  "ImportOutlined",
  "InboxOutlined",
  "InsertRowAboveOutlined",
  "InsertRowBelowOutlined",
  "InsertRowLeftOutlined",
  "InsertRowRightOutlined",
  "InsuranceOutlined",
  "InteractionOutlined",
  "KeyOutlined",
  "LaptopOutlined",
  "LayoutOutlined",
  "LikeOutlined",
  "LineOutlined",
  "LinkOutlined",
  "Loading3QuartersOutlined",
  "LoadingOutlined",
  "LockOutlined",
  "MacCommandOutlined",
  "MailOutlined",
  "ManOutlined",
  "MedicineBoxOutlined",
  "MehOutlined",
  "MenuOutlined",
  "MergeCellsOutlined",
  "MessageOutlined",
  "MobileOutlined",
  "MoneyCollectOutlined",
  "MonitorOutlined",
  "MoreOutlined",
  "NodeCollapseOutlined",
  "NodeExpandOutlined",
  "NodeIndexOutlined",
  "NotificationOutlined",
  "NumberOutlined",
  "OneToOneOutlined",
  "PaperClipOutlined",
  "PartitionOutlined",
  "PayCircleOutlined",
  "PercentageOutlined",
  "PhoneOutlined",
  "PictureOutlined",
  "PlaySquareOutlined",
  "PoundCircleOutlined",
  "PoundOutlined",
  "PoweroffOutlined",
  "PrinterOutlined",
  "ProfileOutlined",
  "ProjectOutlined",
  "PropertySafetyOutlined",
  "PullRequestOutlined",
  "PushpinOutlined",
  "QrcodeOutlined",
  "ReadOutlined",
  "ReconciliationOutlined",
  "RedEnvelopeOutlined",
  "ReloadOutlined",
  "RestOutlined",
  "RobotOutlined",
  "RocketOutlined",
  "RotateLeftOutlined",
  "RotateRightOutlined",
  "SafetyCertificateOutlined",
  "SafetyOutlined",
  "SaveOutlined",
  "ScanOutlined",
  "ScheduleOutlined",
  "SearchOutlined",
  "SecurityScanOutlined",
  "SelectOutlined",
  "SendOutlined",
  "SettingOutlined",
  "ShakeOutlined",
  "ShareAltOutlined",
  "ShopOutlined",
  "ShoppingCartOutlined",
  "ShoppingOutlined",
  "SisternodeOutlined",
  "SkinOutlined",
  "SmileOutlined",
  "SolutionOutlined",
  "SoundOutlined",
  "SplitCellsOutlined",
  "StarOutlined",
  "SubnodeOutlined",
  "SwitcherOutlined",
  "SyncOutlined",
  "TableOutlined",
  "TabletOutlined",
  "TagOutlined",
  "TagsOutlined",
  "TeamOutlined",
  "ThunderboltOutlined",
  "ToTopOutlined",
  "ToolOutlined",
  "TrademarkCircleOutlined",
  "TrademarkOutlined",
  "TransactionOutlined",
  "TranslationOutlined",
  "TrophyOutlined",
  "UngroupOutlined",
  "UnlockOutlined",
  "UploadOutlined",
  "UsbOutlined",
  "UserAddOutlined",
  "UserDeleteOutlined",
  "UserOutlined",
  "UserSwitchOutlined",
  "UsergroupAddOutlined",
  "UsergroupDeleteOutlined",
  "VerifiedOutlined",
  "VideoCameraAddOutlined",
  "VideoCameraOutlined",
  "WalletOutlined",
  "WhatsAppOutlined",
  "WifiOutlined",
  "WomanOutlined",
];

const tabPane: { name: string; value: string[] }[] = [
  { name: "方向", value: OutlinedDirectionIcon },
  { name: "提示", value: OutlinedPromptIcon },
  { name: "编辑", value: OutlinedEditorIcon },
  { name: "数据", value: OutlinedDataIcon },
  { name: "品牌", value: OutlinedBrandIcon },
  { name: "通用", value: OutlinedGeneralIcon },
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
