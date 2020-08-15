import React from "react";
import "./fss.scss";

export interface ListProps {
  children: any;
}

const VFSSList = (props: ListProps) => {
  return (
    <div className="VFSSList-Box">
      <ul className="VFSSList">{props.children}</ul>
    </div>
  );
};
export default VFSSList;
