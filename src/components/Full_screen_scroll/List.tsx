import React, { ReactNode } from "react";
import "./fss.scss";

export interface ListProps {
  children: any;
}
export interface ItemProps {
  childrenItem: ReactNode;
}
// 渲染锚点
class RenderAnchorItem extends React.Component<ItemProps> {
  // eslint-disable-next-line
  constructor(props: ItemProps) {
    super(props);
  }
  render() {
    return (
      <ul className="VFSSListAnchor">
        {React.Children.map(this.props.childrenItem, (item: any, index) => {
          if (item.props.id) {
            return (
              <li onClick={() => this.scrollToAnchor(item.props.id)}>锚点</li>
            );
          }
        })}
      </ul>
    );
  }
  scrollToAnchor = (id: String) => {
    if (id) {
      let ele = document.querySelector(`#${id}`);
      if (ele) {
        ele.scrollIntoView({
          block: "start",
          behavior: "smooth",
        });
      }
    }
  };
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
