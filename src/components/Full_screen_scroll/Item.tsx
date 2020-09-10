import React from "react";
import { getUuid } from "@/utils/utils";

export interface ItemProps {
  children: any;
  style?: Object;
  height?: Number;
  id: string;
}

const VFSSItem = (props: ItemProps) => {
  let height = props.height
    ? { height: `${props.height}px` }
    : { height: "auto" };
  let style = props.style ? props.style : {};
  let styles = Object.assign(style, height);
  return (
    <li id={props.id} className="VFSSItem" style={styles}>
      {props.children}
    </li>
  );
};
export default VFSSItem;
