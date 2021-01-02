import { routerType } from "./../interface/router.interface.d";
import { FormatRouterList } from "@/utils/router";
import loadable from "@loadable/component";

const backstageRouterTree: Array<routerType> = [
  {
    name: "首页",
    path: "/index",
    meta: {},
    auth: true,
    children: [
      {
        name: "编辑器",
        path: "/editor",
        meta: {},
      },
    ],
  },
  {
    name: "分类",
    path: "/classify",
    meta: {},
    auth: true,
    children: [
      {
        name: "文章分类",
        path: "/list",
        meta: {},
      },
    ],
  },
  {
    name: "权限",
    path: "/authority",
    meta: {},
    auth: true,
    children: [
      {
        name: "角色管理",
        path: "role",
        meta: {},
      },
    ],
  },
  {
    name: "系统",
    path: "/system",
    meta: {},
    auth: true,
    children: [
      {
        name: "系统字典",
        path: "/dict",
        meta: {},
      },
      {
        name: "业务字典",
        path: "/dictbiz",
        meta: {},
      },
      {
        name: "系统菜单",
        path: "/menu",
        meta: {},
      },
    ],
  },
];

const BackstageRouter = FormatRouterList(backstageRouterTree).map(
  (item: routerType, index: number) => {
    let file;
    try {
      file = loadable(() => import(`@/views/Backstage${item.path}`));
    } catch (err) {
      console.log(new Error(err));
    }
    item.component = file;
    return item;
  }
);

export default BackstageRouter;
export { backstageRouterTree };
