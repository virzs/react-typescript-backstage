import React from "react";
import { Button } from "antd";
import { authorData, pageData } from "../../data/main-data";

let page = pageData.map((item, index) => {
  return (
    <div key={index}>
      <p>{item.pageName}</p>
      <p>{item.pageValue}</p>
      <p>{item.introduction}</p>
    </div>
  );
});

const Index = () => {
  return (
    <div className="App-header">
      <p>{authorData.author}</p>
      <p>{authorData.introduction}</p>
      <Button type="link" href="https://blog.virs.xyz">
        博客
      </Button>
      <div>{page}</div>
    </div>
  );
};

export default Index;
