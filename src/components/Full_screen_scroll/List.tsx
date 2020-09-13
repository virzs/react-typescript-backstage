import React, { ReactNode } from "react";
import "./fss.scss";
import { boundingClientRect } from "@@/src/utils/utils";

export interface ListProps {
  children: any;
  onClick?: Function;
  onScroll?: Function;
}
export interface ItemProps {
  childrenItem: ReactNode;
  onClick?: Function;
  onScroll?: Function;
}

export interface ItemState {
  activeItem: number | null;
}
// 渲染锚点
class RenderAnchorItem extends React.Component<ItemProps, ItemState> {
  // eslint-disable-next-line
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      activeItem: 0,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  scrollToAnchor = (id: String, index: number) => {
    if (id) {
      let ele = document.querySelector(`#${id}`);
      if (ele) {
        ele.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
        this.setState({ activeItem: index });
        this.props.onClick!(ele, index);
      }
    }
  };
  handleScroll = (e: any) => {
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
          window.sessionStorage.setItem("pageAnchor", index.toString());
        } else {
          let storageTtem = window.sessionStorage.getItem("pageAnchor");
          this.setState({ activeItem: Number(storageTtem) });
        }
        this.props.onScroll!(ele, index);
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
  render() {
    return (
      <div className="VFSSList-Box">
        <ul className="VFSSList">{this.props.children}</ul>
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
