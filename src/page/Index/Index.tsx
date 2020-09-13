import React from "react";
import { pageData } from "@/data/main-data";
import VFSSList from "@/components/Full_screen_scroll/List";
import VFSSItem from "@/components/Full_screen_scroll/Item";
import MainInfo from "@/views/Index/mainInfo";
import { getId } from "@@/src/utils/utils";

let page = pageData.map((item, index) => {
  return (
    <VFSSItem
      id={`V${getId(6)}`}
      key={index + 1}
      height={1000}
      style={{ height: `${window.innerHeight}px` }}
    >
      <p>{item.pageName}</p>
      <p>{item.pageValue}</p>
      <p>{item.introduction}</p>
    </VFSSItem>
  );
});
const getScroll = (data: Object) => {
  // console.log("子传父", data);
};
const Index = () => {
  return (
    <div className="Index">
      <VFSSList onScroll={getScroll}>
        <VFSSItem id={`V${getId(6)}`}>
          <MainInfo></MainInfo>
        </VFSSItem>
        {page}
      </VFSSList>
      <a href="https://beian.miit.gov.cn/">豫ICP备18039751号</a>
    </div>
  );
};

export default Index;
