import BackstageIndex from "@/views/Backstage/Index";
import Backstage from "@/page/Backstage";
import Index from "@/page/Index";
import MdEditor from "@/components/Md_editor/MdEditor";
const routes = [
  {
    path: "/",
    component: Index,
    childRoutes: [
      { path: "about", component: "" },
      { path: "inbox", component: "" },
    ],
  },
];

const backstageRoutes = [
  {
    name: "管理后台",
    path: "/backstage",
    component: Backstage,
    meta: {},
    children: [
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
    ],
  },
];

export { routes, backstageRoutes };
