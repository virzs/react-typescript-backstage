import { message } from "antd";
import axios from "axios";

export interface requestOptionsType {
  headers?: string;
  method: any;
  url: string;
  data?: object;
  params?: object;
}

const request = (options: requestOptionsType) => {
  return new Promise((resolve, reject) => {
    //默认option
    const defaultOptions = {};
    // 合并option
    const requestOptions = {
      ...defaultOptions,
      ...options,
    };
    const headers = Object.assign(
      {
        // 在此处添加默认headers
      },
      requestOptions.headers
    );
    axios({
      method: requestOptions.method,
      url: requestOptions.url,
      data: requestOptions.data,
      params: requestOptions.params,
      headers: headers,
      timeout: 10000, //超时毫秒数
      withCredentials: true, //跨域请求时是否需要使用凭证
    })
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        }
        if (res.status === 201) {
          resolve(res.data);
        }
        if (res.status === 401) {
          console.log(res);
          reject(res.data);
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
        if (err.response) {
          //全局错误提示信息
          message.error(err.response.data.msg);
          switch (err.response.status) {
            case 400:
              console.log(400);
              break;
            case 401:
              console.log(401);
              break;
            case 403:
              console.log(403);
              break;
            case 404:
              console.log(404);
              break;
            default:
              console.log("error");
              break;
          }
        }
      });
  });
};

export default request;
