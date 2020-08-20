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

const VFSSList = (props: ListProps) => {
  let anchorNum: Number = props.children.length; //内部item个数
  console.log(props.children);
  return (
    <div className="VFSSList-Box">
      <ul className="VFSSList">{props.children}</ul>
      <ul className="VFSSListAnchor">{renderAnchorItem(anchorNum)}</ul>
    </div>
  );
};
export default VFSSList;
