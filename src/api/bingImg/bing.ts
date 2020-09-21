import request from "@/utils/axios";

/**
 * 参数    是否必须   值含义
 * format  false     返回数据格式，不存在返回xml格式（js：返回json格式，xml：返回xml格式）
 * idx     false     请求图片截止天数（0：今日，-1：截止至明天，1：截止至昨天，最多获取7日前的图片）
 * n       true      1~8返回请求数量，最多获取8张
 * mkt     false     地区（例：zh-CN）
 */

export const getBingImage = () => {
  return request({
    url: "/getBingImage",
    method: "get",
    params: {
      format: "js",
      idx: 0,
      n: 1,
      mkt: "zh-CN",
    },
  });
};
