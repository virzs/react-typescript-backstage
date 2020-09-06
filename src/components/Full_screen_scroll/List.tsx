import React from "react";
import "./fss.scss";

export interface ListProps {
  children: any;
}
// 渲染锚点
const renderAnchorItem = (num: Number) => {
  let renderAnchorItem: Array<Number> = [];
  for (let i = 0; i <= num; i++) {
    renderAnchorItem.push(i);
  }
  return renderAnchorItem.map((item) => {
    return <li key={Number(item)}>锚点</li>;
  });
};

// const VFSSList = (props: ListProps) => {
//   let anchorNum: Number = props.children.length; //内部item个数
//   console.log(props.children);
//   return (
//     <div className="VFSSList-Box">
//       <ul className="VFSSList">{props.children}</ul>
//       <ul className="VFSSListAnchor">{renderAnchorItem(anchorNum)}</ul>
//     </div>
//   );
// };

class VFSSList extends React.Component {
  // eslint-disable-next-line
  constructor(props: ListProps) {
    super(props);
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }
  render() {
    let anchorNum: Number | null = React.Children.count(this.props.children);
    return (
      <div className="VFSSList-Box">
        <ul className="VFSSList">{this.props.children}</ul>
        <ul className="VFSSListAnchor">{renderAnchorItem(anchorNum)}</ul>
      </div>
    );
  }
  handleScroll = (e: any) => {
    console.log(document.documentElement.scrollTop);
  };
}
export default VFSSList;
