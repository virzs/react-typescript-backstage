import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Backstage from "@/page/Backstage";
import "./App.less";
import Error from "@/page/Error";
import { backstageRoutes, pageRoutes } from "./router/router";

// 处理路由数据
function Recursive(route: any[], basePath: string = "") {
  let list: any = [];
  // 递归将路由tree转为普通列表
  let handleTreeList = (treeList: any[], parentPath: string | null = null) => {
    treeList.forEach((i) => {
      i.path = parentPath ? `${parentPath}${i.path}` : i.path;
      let children = i.children;
      delete i.children;
      list.push(i);
      if (children) handleTreeList(children, i.path);
    });
  };
  handleTreeList(route);
  console.log(list);
  return list.map((i: { path: any; component: any }) => {
    return (
      <Route
        path={`${basePath}${i.path}`}
        key={i.path}
        component={i.component}
        exact
      ></Route>
    );
  });
}

function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Switch>
          {Recursive(pageRoutes)}
          {/* 管理后台部分路由 */}
          <Backstage>{Recursive(backstageRoutes, "/backstage")}</Backstage>
          {/* 错误页面 */}
          <Route component={Error}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
