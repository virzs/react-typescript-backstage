import { routerType } from "@/router/router";
import { deepCopy } from "./utils";

//递归处理路由
export function FormatRouterList(treeList: Array<routerType>) {
  let list: any = [];
  let tree = deepCopy(treeList);
  if (tree.length === 0) return list;
  const Rec = (recList: any[]) => {
    recList.forEach((i) => {
      let children = i.children;
      //只添加最后一级到路由
      if (children && children.length > 0) {
        Rec(children);
      } else {
        list.push(i);
      }
    });
  };
  Rec(tree);
  return list;
}
