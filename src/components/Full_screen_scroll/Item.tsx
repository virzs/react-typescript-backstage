import React from "react";

export interface ItemProps {
  children: any;
  style?: Object;
  height?: Number;
}

const VFSSItem = (props: ItemProps) => {
  let styles = Object.assign(props.style,{height:`${props.height}px`});
  return (
    <li className="VFSSItem" style={styles}>
      {props.children}
    </li>
  );
};

export default VFSSItem;
