import Index from "@/page/Index";
import About from "@/page/About";
import Login from "@/page/Auth/login";
import React from "react";
import { Route } from "react-router";
import { Switch, withRouter } from "react-router-dom";
import Backstage from "@/page/Backstage";
import Stage from "@/page/Backstage";
import Error from "@/page/Error";
import { LocalStorage } from "@/utils/storage";
import { message } from "antd";
import { FormatRouterList } from "@/utils/router";
import BackstageRouter from "@/data/backstage.router";
import { deepCopy } from "@/utils/utils";

export interface routerType {
  readonly name: string;
  readonly path: string;
  readonly component?: any;
  readonly meta?: object;
  readonly auth?: boolean;
  readonly children?: Array<routerType>;
}

const pageRoutes: Array<routerType> = [
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

// 处理路由数据
function Recursive(route: any[], basePath: string = "") {
  let list: any = FormatRouterList(route, basePath);
  return list.map((i: { path: any; component: any }) => {
    return (
      <Route path={i.path} component={i.component} key={i.path} exact></Route>
    );
  });
}

class VRouter extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    console.log("触发刷新", this.props);
    this.RouterGuard(this.props);
  }
  componentWillUnmount() {}
  UNSAFE_componentWillReceiveProps(nextProps: { location: { pathname: any } }) {
    // 判断跳转路由不等于当前路由
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.RouterGuard(nextProps);
    }
  }
  RouterGuard(nextProps: any) {
    const { history, location } = nextProps;
    const storage = new LocalStorage();
    const isLogin = storage.get("user_info"); //根据刷新token判断是否已登录
    const backstageRouter = deepCopy(BackstageRouter);
    const isAuth = backstageRouter.find(
      (i: { path: any }) => i.path === location.pathname
    );
    if (isAuth && !isLogin) {
      message.error("请先登录");
      history.push("/auth/login");
    }
    console.log("guard", isAuth, isLogin);
  }
  render() {
    return (
      <Switch>
        {Recursive(pageRoutes)}
        {/* 管理后台部分路由 */}
        <Backstage>
          <Switch>{Recursive(BackstageRouter, "/backstage")}</Switch>
          <Switch>{BackstageRouter.toString()}</Switch>
        </Backstage>
        {/* 错误页面 */}
        <Route component={Error}></Route>
      </Switch>
    );
  }
}
export default withRouter(VRouter);
export { pageRoutes };
