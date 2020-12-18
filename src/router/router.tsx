import BackstageIndex from "@/views/Backstage/Index";
import MdEditor from "@/components/Md_editor/MdEditor";
import Index from "@/page/Index";
import About from "@/page/About";
import Login from "@/page/Auth/login";
import React from "react";
import { Redirect, Route } from "react-router";
import { BrowserRouter, Switch } from "react-router-dom";
import Backstage from "@/page/Backstage";
import Stage from "@/page/Backstage";
import Error from "@/page/Error";
import { LocalStorage } from "@/utils/storage";
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
  {
    name: "后台",
    path: "/backstage",
    component: Stage,
    meta: {},
  },
  {
    name: "404",
    path: "/error/404",
    component: Error,
    meta: {},
  },
];

const backstageRoutes = [
  {
    name: "首页",
    path: "/index",
    component: BackstageIndex,
    meta: {},
    auth: true,
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

//递归处理路由
function FormatRouterList(treeList: any[], parentPath: string | null = null) {
  let list: any = [];
  if (treeList.length === 0) return list;
  const Rec = (recList: any[], recPath: string | null = null) => {
    recList.forEach((i) => {
      i.path = recPath ? `${recPath}${i.path}` : i.path;
      let children = i.children;
      //只添加最后一级到路由
      if (children) Rec(children, i.path);
      else list.push(i);
    });
  };
  Rec(treeList, parentPath);
  return list;
}

//路由守卫
class RouterGuard extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
  }
  render() {
    const { routerConfig, location } = this.props;
    const { pathname } = location;
    console.log(pathname, location, routerConfig);
    const storage = new LocalStorage();
    const isLogin = storage.get("refresh_token"); //根据刷新token判断是否已登录
    if (!isLogin && routerConfig.auth) {
      return <Redirect to="/error/404"></Redirect>;
    }
    return (
      <Route
        path={routerConfig.path}
        component={routerConfig.component}
        exact
      ></Route>
    );
  }
}

// 处理路由数据
function Recursive(route: any[], basePath: string = "") {
  let list: any = FormatRouterList(route);
  return list.map((i: { path: any; component: any }) => {
    i.path = `${basePath}${i.path}`;
    return (
      <Route path={i.path} component={i.component} key={i.path} exact></Route>
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
            <RouterGuard routerConfig={backstageRoutes}></RouterGuard>
          </Switch>
        </Backstage>
        {/* 错误页面 */}
        <Route component={Error}></Route>
      </Switch>
    </BrowserRouter>
  );
};

export { VRouter, backstageRoutes, pageRoutes };
