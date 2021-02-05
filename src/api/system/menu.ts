import request from "@/utils/axios";

interface createType {
  readonly name: string;
  readonly alias: string;
  readonly path: string;
  readonly remark: string;
  readonly code: number;
  readonly type: number;
  readonly sort: number;
  readonly hidden: number;
}

interface updateType extends createType {
  readonly id: string;
}

//新建菜单
export const create = (data: createType) => {
  return request({
    url: "/api/system/menu/create",
    method: "post",
    data,
  });
};

//编辑菜单
export const update = (data: updateType) => {
  return request({
    url: "/api/system/menu/update",
    method: "put",
    data,
  });
};

//删除菜单
export const del = (id: string) => {
  return request({
    url: "/api/system/menu/delete",
    method: "delete",
    data: { id },
  });
};

//新建菜单
export const detail = (id: string) => {
  return request({
    url: "/api/system/menu/detail",
    method: "get",
    data: { id },
  });
};

//获取树形列表
export const treeList = () => {
  return request({
    url: "/api/system/menu/tree-list",
    method: "get",
  });
};
