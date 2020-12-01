import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "@/page/Index";
import About from "@/page/About";
import Error from "@/page/Error";
import Login from "@/page/Auth/login";
import Backstage from "@/page/Backstage";
import "./App.less";
import { backstageRoutes } from "./router/router";

function Recursive(route: any[]) {
  let list: any = [];
  // 递归将路由tree转为普通列表
  let handleTreeList = (treeList: any[], parentPath: string | null = null) => {
    treeList.forEach((i) => {
      i.path = parentPath ? `${parentPath}${i.path}` : i.path;
      list.push(i);
      if (i.children) {
        handleTreeList(i.children, i.path);
      }
    });
  };
  handleTreeList(route);
  return list.map((i: { path: any; component: any }) => {
    return (
      <Route path={i.path} key={i.path} component={i.component} exact></Route>
    );
  });
}

function App() {
  return (
    <div className="APP">
      <BrowserRouter>
        <Switch>
          <Route path="/about" component={About} exact></Route>
          <Route path="/" component={Index} exact></Route>
          <Route path="/auth/login" component={Login} exact></Route>
          <Backstage>{Recursive(backstageRoutes)}</Backstage>
          {/* 错误页面 */}
          <Route component={Error}></Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
