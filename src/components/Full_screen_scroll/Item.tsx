import React from "react";

export interface ItemProps {
  children: any;
  style?: Object;
  height?: Number;
}

const VFSSItem = (props: ItemProps) => {
  let height = props.height
    ? { height: `${props.height}px` }
    : { height: "auto" };
  let style = props.style ? props.style : {};
  let styles = Object.assign(style, height);
  return (
    <li className="VFSSItem" style={styles}>
      {props.children}
    </li>
  );
};

export default VFSSItem;
