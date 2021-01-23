import request from "@/utils/axios";

export interface createType {
  readonly name: string;
  readonly alias: string;
  readonly path: string;
  readonly remark: string;
  readonly code: number;
  readonly type: number;
  readonly sort: number;
  readonly hidden: number;
}

export const create = (data: createType) => {
  return request({
    url: "/api/system/menu/create",
    method: "post",
    data,
  });
};

export const treeList = () => {
  return request({
    url: "/api/system/menu/tree-list",
    method: "get",
  });
};
