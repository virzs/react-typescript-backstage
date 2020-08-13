import React from "react";
import "./css/index.scss";

const Index = () => {
  return (
    <div id="Error">
      <div className="svg">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
          {/* 挂画开始 */}
          <g transform="translate(100,70)">
            <line
              x1="46"
              y1="17"
              x2="33"
              y2="30"
              style={{ stroke: "#020202", strokeWidth: "2.5" }}
            />
            <line
              x1="44"
              y1="17"
              x2="57"
              y2="30"
              style={{ stroke: "#020202", strokeWidth: "2.5" }}
            />
            <rect
              x="20"
              y="30"
              rx="0"
              ry="0"
              width="50"
              height="40"
              style={{
                fill: "#FFE0BD",
                stroke: "#020202",
                strokeWidth: "3",
                opacity: "1",
              }}
            />
            <rect
              x="25"
              y="35"
              rx="0"
              ry="0"
              width="40"
              height="30"
              style={{
                fill: "#FFFFFF",
                stroke: "#020202",
                strokeWidth: "2.5",
                opacity: "1",
              }}
            />
            <line
              x1="28"
              y1="41"
              x2="60"
              y2="41"
              style={{ stroke: "#020202", strokeWidth: "2.5" }}
            />
            <line
              x1="28"
              y1="47"
              x2="55"
              y2="47"
              style={{ stroke: "#020202", strokeWidth: "2.5" }}
            />
            <line
              x1="28"
              y1="53"
              x2="50"
              y2="53"
              style={{ stroke: "#020202", strokeWidth: "2.5" }}
            />
            <line
              x1="28"
              y1="59"
              x2="50"
              y2="59"
              style={{ stroke: "#020202", strokeWidth: "2.5" }}
            />
            <circle
              cx="57"
              cy="55"
              r="3"
              fill="red"
            />
          </g>
          {/* 挂画结束 */}
        </svg>
      </div>
    </div>
  );
};
export default Index;
