// 生成随机id
export const getId = (length: number) => {
  return Number(
    Math.random().toString().substr(3, length) + Date.now()
  ).toString(36);
};
//生成uuid
export const getUuid = () => {
  let s: any = [];
  let hexDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4";
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "-";
  let uuid = s.join("");
  return uuid;
};

//获取元素是否在可视范围
export const boundingClientRect = (ele: Element | null) => {
  if (ele === null) return false;
  let winHeight = window.innerHeight;
  let rect = ele.getBoundingClientRect();
  let rectTop = rect.top;
  let rectBottom = rect.bottom;
  let isTopInWindow = 0 <= rectTop && rectTop <= winHeight * 0.1; //元素位于可视范围顶部距离是否小于一定范围
  let isBottomInWindow = 0 <= rectBottom && rectBottom <= winHeight * 0.1;
  return isTopInWindow || isBottomInWindow;
};

//获取地理位置信息
export const getGeolocation = (
  successCallback: PositionCallback,
  errorCallback: PositionErrorCallback
) => {
  let geolocation = navigator.geolocation;
  let options = {
    enableHighAccuracy: false, //是否启用高精确度模式
    timeout: 10000, //超时时间
    maximumAge: 3600000, //重新获取信息时间
  };
  if (geolocation) {
    /**
     * successCallback返回内容
     * {
     *    coords :{
     *        accuracy(	latitude和longitude属性的精确性，单位是m)
     *        altitude(海拔)
     *        altitudeAccuracy(	altitude属性的精确性)
     *        heading(朝向，即设备正北顺时针前进的方位)
     *        latitude(纬度)
     *        longitude(经度)
     *        speed(设备外部环境的移动速度，单位是m/s)
     *    },
     *    timestamp(获取地理位置信息的时间)
     * }
     */
    /**errorCallback返回内容
     * {
     *    code(整数，错误编号)
     *    message(错误描述)
     * }
     */
    geolocation.getCurrentPosition(successCallback, errorCallback, options);
  } else {
    console.log("Error：当前浏览器不支持获取地理位置信息");
  }
};

//判断数据类型
export const getObjType = (obj: any) => {
  const toString = Object.prototype.toString;
  const map = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regExp",
    "[object Undefined]": "undefined",
    "[object Null]": "null",
    "[object Object]": "object",
  };
  if (obj instanceof Element) {
    return "element";
  }
  return map[toString.call(obj)];
};

//数组深拷贝
export const deepCopy = (data: any): any => {
  let type = getObjType(data);
  let obj;
  if (type === "array") {
    obj = [];
  } else if (type === "object") {
    obj = {};
  } else {
    //不再具有下一层次
    return data;
  }
  if (type === "array") {
    for (let i = 0, len = data.length; i < len; i++) {
      obj[i] = deepCopy(data[i]);
    }
  } else if (type === "object") {
    for (let key in data) {
      obj[key] = deepCopy(data[key]);
    }
  }
  return obj;
};
