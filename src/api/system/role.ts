import request from "@/utils/axios";

interface roleValues {
  name: string;
  remark: string;
}

interface roleUpdateValues extends roleValues {
  id: string;
}

//角色分页
export const getPage = (current: number, size: number) => {
  return request({
    url: "/api/system/role/page",
    method: "get",
    params: { current, size },
  });
};

//角色列表
export const getList = () => {
  return request({
    url: "/api/system/role/list",
    method: "get",
  });
};

//角色详情
export const getDetail = (id: string) => {
  return request({
    url: "/api/system/role/detail",
    method: "get",
    params: { id },
  });
};

//新增角色
export const add = (data: roleValues) => {
  return request({
    url: "/api/system/role/create",
    method: "post",
    data,
  });
};

//编辑角色
export const update = (data: roleUpdateValues) => {
  return request({
    url: "/api/system/role/update",
    method: "put",
    data,
  });
};

//删除角色
export const del = (id: string) => {
  return request({
    url: "/api/system/role/delete",
    method: "delete",
    data: { id },
  });
};
