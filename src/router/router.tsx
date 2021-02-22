import Index from "@/page/Index";
import About from "@/page/About";
import Login from "@/page/Auth/login";
import React, { Suspense } from "react";
import { Redirect, Route } from "react-router";
import { Switch, withRouter } from "react-router-dom";
import Backstage from "@/page/Backstage";
import Error from "@/page/Error";
import { LocalStorage, SessionStorage } from "@/utils/storage";
import { Button, message, Result } from "antd";
import { FormatRouterList } from "@/utils/router";
import { GlobalLoading } from "@/components/Global_Loading/GlobalLoading";
import { ErrorBoundary } from "@/components/Error_Boundaries/ErrorBoundaries";
import { LocalLoading } from "@/components/Local_Loading/LocalLoading";

export interface routerType {
  readonly name: string;
  readonly path: string;
  readonly exact?: boolean;
  readonly component?: any;
  readonly meta?: object;
  readonly auth?: boolean;
  readonly children?: Array<routerType>;
}

const pageRoutes: Array<routerType> = [
  {
    name: "首页",
    path: "/",
    exact: true,
    component: Index,
    children: [],
  },
  {
    name: "关于",
    path: "/about",
    exact: true,
    component: About,
    meta: {},
  },
  {
    name: "登录",
    path: "/auth/login",
    exact: true,
    component: Login,
    meta: {},
  },
  {
    name: "404",
    path: "/error/404",
    exact: true,
    component: Error,
    meta: {},
  },
];

// 处理路由数据
function Recursive(route: any[], basePath: string = "") {
  let list: any = FormatRouterList(route);
  return list.map((i: routerType) => {
    return (
      <Route
        path={`${basePath}${i.path}`}
        component={i.component}
        key={i.path}
        exact={i.exact || true}
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
  RouterGuard() {
    const menu = SessionStorage.get("menu");
    const isLogin = LocalStorage.get("user_info") ? true : false;
    const { history } = this.props;
    const findLocation = () => {
      const menuList = FormatRouterList(menu);
      return menuList.find(
        (item: any) => window.location.pathname === `/backstage${item.path}`
      );
    };
    //session中存在菜单及登陆时
    if (
      menu &&
      isLogin &&
      window.location.pathname.indexOf("backstage") !== -1
    ) {
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
        history.push("/backstage/error/404");
      }
    }
  }

  render() {
    return (
      <Suspense fallback={<GlobalLoading />}>
        <ErrorBoundary>
          <Switch>
            {Recursive(pageRoutes)}
            {/* 管理后台部分路由 */}
            <Route path="/backstage">
              <Backstage>
                <Suspense fallback={<LocalLoading />}>
                  {this.state.currentRouter !== null ? (
                    <Route
                      path={`/backstage${this.state.currentRouter.path}`}
                      component={this.state.currentRouter.component}
                      exact
                    ></Route>
                  ) : (
                    <Route
                      path="/backstage/error/404"
                      component={() => (
                        <Result
                          status="404"
                          title="404"
                          subTitle="页面不存在"
                          extra={
                            <Button
                              type="primary"
                              onClick={() => window.history.go(-1)}
                            >
                              返回上一页
                            </Button>
                          }
                        />
                      )}
                      exact
                    ></Route>
                  )}
                </Suspense>
              </Backstage>
            </Route>
            <Redirect from="*" to="/error/404" />
          </Switch>
        </ErrorBoundary>
      </Suspense>
    );
  }
}
export default withRouter(VRouter);
export { pageRoutes };
