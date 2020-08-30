import React from "react";
import { authorData } from "@/data/main-data";

const Links = authorData.links.map((item, index) => {
  return (
    <a href={item.link} key={index}>
      {item.name}
    </a>
  );
});

const MainInfo = () => {
  return (
    <div style={{ height: `${window.innerHeight}px` }}>
      <p>{authorData.author}</p>
      <p>{authorData.introduction}</p>
      {Links}
    </div>
  );
};

export default MainInfo;
