import { routerType } from "./../interface/router.interface.d";
import { FormatRouterList } from "@/utils/router";
import React from "react";

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
    name: "权限",
    path: "/authority",
    meta: {},
    auth: true,
    children: [
      {
        name: "角色管理",
        path: "/authority/role",
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

const BackstageRouter = FormatRouterList(backstageRouterTree).map(
  (item: routerType) => {
    try {
      item.component = React.lazy(
        () => import(`@/views/Backstage${item.path}`)
      );
    } catch (err) {
      console.log(new Error(err));
    }
    return item;
  }
);

export default BackstageRouter;
export { backstageRouterTree };
