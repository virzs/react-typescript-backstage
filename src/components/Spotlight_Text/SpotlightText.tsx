import React from "react";
import "./st.scss";

/**
 * api
 */
export interface SpotlightProps {
  children: String; //文字内容
  size?: Number; //文字大小
  spotlight?: String; //聚光显示内容
}

const SpotlightText = (props: SpotlightProps) => {
  let style = {
    fontSize: `${props.size ? props.size : "12"}px`,
  };
  return (
    <p
      className="spotlight-text"
      data-spotlight={props.spotlight ? props.spotlight : props.children}
      style={style}
    >
      {props.children}
    </p>
  );
};

export default SpotlightText;
