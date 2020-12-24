import BackstageIndex from "@/views/Backstage/Index";
import MdEditor from "@/components/Md_editor/MdEditor";
import Index from "@/page/Index";
import About from "@/page/About";
import Login from "@/page/Auth/login";
import React from "react";
import { Redirect, Route } from "react-router";
import { Switch, withRouter } from "react-router-dom";
import Backstage from "@/page/Backstage";
import Stage from "@/page/Backstage";
import Error from "@/page/Error";
import { LocalStorage } from "@/utils/storage";
import { deepCopy } from "@/utils/utils";

export interface routerType {
  readonly name: string;
  readonly path: string;
  readonly component: any;
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

const backstageRoutes: Array<routerType> = [
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
function FormatRouterList(
  treeList: Array<routerType>,
  parentPath: string | null = null
) {
  let list: any = [];
  let tree = deepCopy(treeList);
  if (tree.length === 0) return list;
  const Rec = (recList: any[], recPath: string | null = null) => {
    recList.forEach((i) => {
      let children = i.children;
      i.path = recPath ? `${recPath}${i.path}` : i.path;
      //只添加最后一级到路由
      if (children && children.length > 0) {
        Rec(children, i.path);
      } else {
        list.push(i);
      }
    });
  };
  Rec(tree, parentPath);
  return list;
}

//路由守卫
class RouterGuard extends React.Component<any, any> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    console.log("组件加载", this.props.location);
    this.props.history.listen(() => {
      console.log("路由变化", this.props);
    });
  }
  render() {
    const { routerConfig, location } = this.props;
    const { pathname } = location;
    const storage = new LocalStorage();
    const isLogin = storage.get("refresh_token"); //根据刷新token判断是否已登录
    const targetRouterConfig = routerConfig.find(
      (i: routerType) => i.path === pathname
    );
    console.log(pathname, location, routerConfig, targetRouterConfig);
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
  }
  UNSAFE_componentWillReceiveProps(nextProps: { location: { pathname: any } }) {
    // 判断跳转路由不等于当前路由
    if (nextProps.location.pathname !== this.props.location.pathname) {
      console.log("路由改变触发", nextProps, this.props);
    }
  }
  render() {
    return (
      <Switch>
        {Recursive(pageRoutes)}
        {/* 管理后台部分路由 */}
        <Backstage>
          <Switch>
            {Recursive(backstageRoutes, "/backstage")}
          </Switch>
        </Backstage>
        {/* 错误页面 */}
        <Route component={Error}></Route>
      </Switch>
    );
  }
}
export default withRouter(VRouter);
export { backstageRoutes, pageRoutes };
