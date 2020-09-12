import React, { ReactNode } from "react";
import "./fss.scss";
import { boundingClientRect } from "@@/src/utils/utils";

export interface ListProps {
  children: any;
  onScroll?: Function;
}
export interface ItemProps {
  childrenItem: ReactNode;
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
  scrollToAnchor = (id: String, index: number) => {
    if (id) {
      let ele = document.querySelector(`#${id}`);
      if (ele) {
        ele.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }
    this.setState({ activeItem: index });
  };
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = (e: any) => {
    React.Children.forEach(this.props.childrenItem, (item: any, index) => {
      if (item.props) {
        let active = boundingClientRect(
          document.querySelector(`#${item.props.id}`)
        );
        console.log(active);
        if (active) this.setState({ activeItem: index });
      }
    });
  };
  render() {
    return (
      <ul className="VFSSListAnchor">
        {React.Children.map(this.props.childrenItem, (item: any, index) => {
          if (item.props.id) {
            return (
              <li
                className={this.state.activeItem === index ? "active" : ""}
                onClick={() => this.scrollToAnchor(item.props.id, index)}
              ></li>
            );
          }
        })}
      </ul>
    );
  }
}

class VFSSList extends React.Component<ListProps> {
  // eslint-disable-next-line
  constructor(props: ListProps) {
    super(props);
  }
  render() {
    // let anchorNum: Number | null = React.Children.count(this.props.children);
    return (
      <div className="VFSSList-Box">
        <ul className="VFSSList">{this.props.children}</ul>
        <RenderAnchorItem childrenItem={this.props.children}></RenderAnchorItem>
      </div>
    );
  }
}
export default VFSSList;
