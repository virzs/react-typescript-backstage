import React, { ReactNode } from "react";
import "./fss.scss";

export interface ListProps {
  children: any;
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
      activeItem: null,
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

class VFSSList extends React.Component {
  // eslint-disable-next-line
  constructor(props: ListProps) {
    super(props);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
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
  handleScroll = (e: any) => {
    console.log(document.documentElement.scrollTop);
    // console.log(this.props.children[0]);
  };
}
export default VFSSList;
