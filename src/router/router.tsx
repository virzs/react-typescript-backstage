import BackstageIndex from "@/views/Backstage/Index";
import MdEditor from "@/components/Md_editor/MdEditor";
import Index from "@/page/Index";
import About from "@/page/About";
import Login from "@/page/Auth/login";
import React from "react";
import { Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import Backstage from "@/page/Backstage";
import Error from "@/page/Error";
const pageRoutes = [
  {
    name: "首页",
    path: "/",
    component: Index,
    children: [],
  },
  {
    name: "关于",
    path: "/about",
    component: About,
    meta: {},
  },
  {
    name: "登录",
    path: "/auth/login",
    component: Login,
    meta: {},
  },
];

const backstageRoutes = [
  {
    name: "首页",
    path: "/index",
    component: BackstageIndex,
    meta: {},
    children: [
      {
        name: "编辑器",
        path: "/editor",
        component: MdEditor,
        meta: {},
      },
    ],
  },
];

// 处理路由数据
function Recursive(route: any[], basePath: string = "") {
  let list: any = [];
  // 递归将路由tree转为普通列表
  let handleTreeList = (treeList: any[], parentPath: string | null = null) => {
    treeList.forEach((i) => {
      i.path = parentPath ? `${parentPath}${i.path}` : i.path;
      let children = i.children;
      list.push(i);
      if (children) handleTreeList(children, i.path);
    });
  };
  handleTreeList(route);
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

const VRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        {Recursive(pageRoutes)}
        {/* 管理后台部分路由 */}
        <Backstage>
          <Switch>
            {Recursive(backstageRoutes, "/backstage")}
            <Route component={Error}></Route>
          </Switch>
        </Backstage>
        {/* 错误页面 */}
        <Route component={Error}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export { VRouter, backstageRoutes, pageRoutes };
