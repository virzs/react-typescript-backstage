import Index from "@/page/Index";
import About from "@/page/About";
import Login from "@/page/Auth/login";
import React, { Suspense } from "react";
import { Route } from "react-router";
import { Switch, withRouter } from "react-router-dom";
import Backstage from "@/page/Backstage";
import Stage from "@/page/Backstage";
import Error from "@/page/Error";
import { SessionStorage } from "@/utils/storage";
import { message } from "antd";
import { FormatRouterList } from "@/utils/router";
import { GlobalLoading } from "@/components/Global_Loading/GlobalLoading";
import { ErrorBoundary } from "@/components/Error_Boundaries/ErrorBoundaries";
import { LocalLoading } from "@/components/Local_Loading/LocalLoading";

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
  let list: any = FormatRouterList(route);
  return list.map((i: { path: any; component: any }) => {
    return (
      <Route
        path={`${basePath}${i.path}`}
        component={i.component}
        key={i.path}
        exact
      ></Route>
    );
  });
}

class VRouter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isLogin: false,
      prevRouter: {},
      nextRouter: {},
      currentRouter: null,
    };
  }
  componentDidMount() {
    this.RouterGuard();
  }
  componentWillUnmount() {}
  componentDidUpdate() {
    this.RouterGuard();
  }
  //TODO 登录后获取菜单储存到session
  //TODO 后台路由跳转前比对session中信息，不存在则跳转404，存在则直接跳转
  //TODO 接口根据登录用户角色返回拥有权限的菜单
  RouterGuard() {
    const menu = SessionStorage.get("menu");
    const findLocation = () => {
      const menuList = FormatRouterList(menu);
      return menuList.find(
        (item: any) => window.location.pathname === `/backstage${item.path}`
      );
    };
    //session中存在菜单时
    if (menu) {
      let currentRouter = findLocation();
      if (currentRouter) {
        //currentRouter存在并与当前router id相同时返回
        if (
          this.state.currentRouter &&
          this.state.currentRouter.id === currentRouter.id
        )
          return;
        this.setState({
          currentRouter: {
            ...currentRouter,
            component: React.lazy(
              () => import(`@/views/Backstage${currentRouter.path}`)
            ),
          },
        });
      } else if (!currentRouter && this.state.currentRouter !== null) {
        this.setState({ currentRouter: null });
        message.error("页面不存在！！！");
        const { history } = this.props;
        history.push("/backstage/error/404");
      }
    }
    // const { history, location } = nextRouter;
    // if (nextRouter.location.pathname === prevRouter.location.pathname) return;
    // const storage = new LocalStorage();
    // const isLogin = storage.get("user_info"); //根据刷新token判断是否已登录
    // const backstageRouter = deepCopy(BackstageRouter);
    // const isAuth = backstageRouter.find(
    //   (i: { path: any }) => i.path === location.pathname
    // );
    // this.setState({ isLogin: !isLogin });
    // if (isAuth && !isLogin) {
    //   message.error("请先登录");
    //   history.push("/auth/login");
    // }
  }

  render() {
    return (
      <Suspense fallback={<GlobalLoading />}>
        <ErrorBoundary>
          <Switch>
            {Recursive(pageRoutes)}
            {/* 管理后台部分路由 */}
            <Backstage>
              <Suspense fallback={<LocalLoading />}>
                <Switch>
                  {this.state.currentRouter !== null ? (
                    <Route
                      path={`/backstage${this.state.currentRouter.path}`}
                      component={this.state.currentRouter.component}
                    ></Route>
                  ) : (
                    <Route
                      path="/backstage/error/404"
                      component={React.lazy(() => import("@/page/Error"))}
                    ></Route>
                  )}
                </Switch>
              </Suspense>
            </Backstage>
          </Switch>
        </ErrorBoundary>
      </Suspense>
    );
  }
}
export default withRouter(VRouter);
export { pageRoutes };
