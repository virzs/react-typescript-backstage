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
    Object.assign(
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
      headers: requestOptions.headers,
      timeout: 10000, //超时毫秒数
      withCredentials: true, //跨域请求时是否需要使用凭证
    })
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data);
        }
        if (res.data.code === 401) {
          console.log(res);
          reject(res);
        }
      })
      .catch((err) => {
        if (err.response) {
          switch (err.response.status) {
            case "403":
              console.log(403);
              break;
            case "404":
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
