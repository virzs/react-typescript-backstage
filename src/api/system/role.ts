import request from "@/utils/axios";

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
