import { LocalStorage } from "@/utils/storage";
import request from "@/utils/axios";

const storage = new LocalStorage();

//用户登录
export const login = (data: object) => {
  return request({
    url: "/api/auth/login",
    method: "post",
    data,
  });
};

//获取当前登录用户信息
export const me = () => {
  return request({
    url: "/api/user/me",
    method: "get",
  });
};

//刷新token
export const refresh = () => {
  return request({
    url: "/api/auth/refresh",
    method: "get",
    headers: {
      refresh_token: storage.get("refresh_token"),
    },
  });
};
