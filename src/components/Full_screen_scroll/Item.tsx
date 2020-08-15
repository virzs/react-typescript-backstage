import React from "react";

export interface ItemProps {
  children: any;
  style?: Object;
  height?: String;
}

const VFSSItem = (props: ItemProps) => {
  return (
    <li className="VFSSItem" style={props.style}>
      {props.children}
    </li>
  );
};

export default VFSSItem;
