import Backstage from "@/page/Backstage";
import BackstageIndex from "@/views/Backstage/Index";
import MdEditor from "@/components/Md_editor/MdEditor";
import Index from "@/page/Index";
import About from "@/page/About";
import Login from "@/page/Auth/login";
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
    name: "管理后台",
    path: "/backstage",
    component: Backstage,
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

export { pageRoutes, backstageRoutes };
