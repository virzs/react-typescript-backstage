import { routerType } from "./../interface/router.interface.d";

//默认的后台路由
const backstageRouterTree: Array<routerType> = [
  {
    name: "首页",
    path: "/index",
    meta: {},
    auth: true,
    children: [
      {
        name: "编辑器",
        path: "/index/editor",
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
        path: "/classify/list",
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
        name: "角色管理",
        path: "/system/role",
        meta: {},
      },
      {
        name: "系统字典",
        path: "/system/dict",
        meta: {},
      },
      {
        name: "业务字典",
        path: "/system/dictbiz",
        meta: {},
      },
      {
        name: "系统菜单",
        path: "/system/menu",
        meta: {},
      },
    ],
  },
];

export { backstageRouterTree };
