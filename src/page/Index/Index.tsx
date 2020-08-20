import React from "react";
import { authorData, pageData } from "../../data/main-data";
import VFSSList from "../../components/Full_screen_scroll/List";
import VFSSItem from "../../components/Full_screen_scroll/Item";

let page = pageData.map((item, index) => {
  return (
    <VFSSItem
      key={index}
      height={1000}
      style={{ height: `${window.innerHeight}px` }}
    >
      <p>{item.pageName}</p>
      <p>{item.pageValue}</p>
      <p>{item.introduction}</p>
    </VFSSItem>
  );
});
console.log(window.innerHeight);
const Index = () => {
  return (
    <div className="Index">
      <p>{authorData.author}</p>
      <p>{authorData.introduction}</p>
      <VFSSList>{page}</VFSSList>
    </div>
  );
};

export default Index;
