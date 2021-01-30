import request from "@/utils/axios";

export const getPage = (current: number, size: number) => {
  return request({
    url: "/api/system/role/page",
    method: "get",
    params: { current, size },
  });
};