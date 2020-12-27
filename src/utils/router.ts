import { routerType } from "@/router/router";
import { deepCopy } from "./utils";

//递归处理路由
export function FormatRouterList(
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
