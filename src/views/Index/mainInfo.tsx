import React from "react";
import "./mainInfo.scss";
import { authorData } from "@/data/main-data";
import SpotlightText from "@@/src/components/Spotlight_Text/SpotlightText";

const Links = authorData.links.map((item, index) => {
  return (
    <li>
      <a href={item.link} key={index}>
        {item.name}
      </a>
    </li>
  );
});

const MainInfo = () => {
  return (
    <div className="main-info" style={{ height: `${window.innerHeight}px` }}>
      <p className="author">{"我是" + authorData.author}</p>
      <SpotlightText size={58}>{authorData.introduction}</SpotlightText>
      <ul>{Links}</ul>
    </div>
  );
};

export default MainInfo;
