import { refresh } from "./../api/auth/auth";
import { message } from "antd";
import axios from "axios";
import { SessionStorage } from "./storage";

export interface requestOptionsType {
  headers?: object;
  method: any;
  url: string;
  data?: object;
  params?: object;
}

let isRefreshToken = false; //是否处于需要刷新状态
let requests: Array<any> = []; // 存储待重发请求的数组(同时发起多个请求的处理)

//axios默认配置
const instance = axios.create({
  timeout: 10000,
  validateStatus: (status: number) => status >= 200 && status <= 500,
});

//在请求或响应被 then 或 catch 处理前拦截。
instance.interceptors.request.use(
  (config) => {
    const access_token = SessionStorage.get("access_token");
    //本地存储中存在token且没有携带token
    if (access_token) {
      config.headers["access_token"] = access_token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//响应拦截器，处理请求后的数据
instance.interceptors.response.use(
  (res) => {
    const status: number = Number(res.data.code || res.status);
    const msg: string = res.data.msg || "未知错误";
    const { config } = res;
    //当前请求状态码为401及请求路径不为刷新token接口时
    if (
      status === 401 &&
      config.url &&
      !config.url.includes("/api/auth/refresh")
    ) {
      if (!isRefreshToken) {
        isRefreshToken = true;
        return refresh()
          .then((res) => {
            const { access_token } = res.data;
            SessionStorage.set("access_token", access_token);
            requests.forEach((cb: any) => cb(access_token));
            requests = []; // 重新请求完清空
            config.headers["access_token"] = access_token;
            return instance(config);
          })
          .catch((err) => {
            if (window.location.pathname !== "/auth/login") {
              window.location.href = "/auth/login";
              message.error("登陆状态已失效，请重新登录");
            }
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshToken = false;
          });
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise((resolve) => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push((token: any) => {
            config.headers["access_token"] = token;
            resolve(instance(config));
          });
        });
      }
    }
    if (status !== 200) {
      message.error(msg);
      return Promise.reject(msg);
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
