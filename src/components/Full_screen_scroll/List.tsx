import React, { ReactNode } from "react";
import "./fss.scss";
import { boundingClientRect } from "@@/src/utils/utils";

export interface ListProps {
  children: any;
  onClick?: Function;
  onScroll?: Function;
  onChange?: Function;
}
export interface ItemProps {
  childrenItem: ReactNode;
  onClick?: Function;
  onScroll?: Function;
  onChange?: Function;
}

export interface ItemState {
  activeItem: number | null;
  click: Boolean;
}
// 渲染锚点
class RenderAnchorItem extends React.Component<ItemProps, ItemState> {
  // eslint-disable-next-line
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      activeItem: 0,
      click: false,
    };
  }
  componentDidMount() {
    this.getActiveToSession();
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  //锚点点击事件
  onClick = (ele: Element, index: number) => {
    if (this.props.onClick) this.props.onClick(ele, index);
  };
  //页面滚动事件
  onScroll = (ele: Element, index: number) => {
    if (this.props.onScroll) this.props.onScroll(ele, index);
  };
  //change事件
  onChange = (ele: Element, index: number) => {
    if (this.props.onChange) this.props.onChange(ele, index);
  };
  //设置当前锚点到会话存储
  setActiveToSession = (index: number) => {
    window.sessionStorage.setItem("pageAnchor", index.toString());
  };
  //获取会话存储中的锚点信息
  //解决刷新页面锚点加载闪烁的问题
  getActiveToSession = () => {
    let storageTtem = window.sessionStorage.getItem("pageAnchor");
    this.setState({ activeItem: Number(storageTtem) });
  };
  scrollToAnchor = (id: String, index: number) => {
    this.setState({ click: true });
    if (id) {
      let ele = document.querySelector(`#${id}`);
      if (ele) {
        ele.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
        this.setState({ activeItem: index });
        window.sessionStorage.setItem("pageAnchor", index.toString());
        this.onClick(ele, index);
        this.onChange(ele, index);
      }
    }
  };
  handleScroll = (e: any) => {
    let timer = undefined;
    //页面滚动时首先清除定时器，页面滚动停止后设置点击事件关闭，解决滚动与点击时锚点冲突的问题
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.setState({ click: false });
    }, 200);
    if (this.state.click) return;
    // 循环children改变选中状态
    React.Children.forEach(
      this.props.childrenItem,
      (item: any, index: number) => {
        let ele = document.querySelector(`#${item.props.id}`);
        let active = boundingClientRect(ele);
        /**
         * 锚点滚动监听及解决刷新页面锚点失效的问题 ↓
         */
        if (active) {
          this.setState({ activeItem: index });
          this.setActiveToSession(index);
        } else {
          this.getActiveToSession();
        }
        if (ele) {
          this.onScroll(ele, index);
          this.onChange(ele, index);
        }
      }
    );
  };
  render() {
    return (
      <ul className="VFSSListAnchor">
        {React.Children.map(
          this.props.childrenItem,
          (item: any, index: number) => {
            if (item.props.id) {
              return (
                <li
                  className={this.state.activeItem === index ? "active" : ""}
                  onClick={() => this.scrollToAnchor(item.props.id, index)}
                ></li>
              );
            }
          }
        )}
      </ul>
    );
  }
}

class VFSSList extends React.Component<ListProps> {
  // eslint-disable-next-line
  constructor(props: ListProps) {
    super(props);
  }
  //锚点点击事件
  handleClick = (ele: Element, index: number) => {
    if (this.props.onClick) this.props.onClick(ele, index);
  };
  //页面滚动事件
  handleScroll = (ele: Element, index: number) => {
    if (this.props.onScroll) this.props.onScroll(ele, index);
  };
  handleChange = (ele: Element, index: number) => {
    if (this.props.onChange) this.props.onChange(ele, index);
  };
  render() {
    return (
      <div className="VFSSList-Box">
        <div className="VFSSList">{this.props.children}</div>
        <RenderAnchorItem
          onClick={this.handleClick}
          onScroll={this.handleScroll}
          childrenItem={this.props.children}
        ></RenderAnchorItem>
      </div>
    );
  }
}
export default VFSSList;
