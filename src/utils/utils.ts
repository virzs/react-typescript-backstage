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
  let isTopInWindow = 0 < rectTop && rectTop < winHeight;
  let isBottomInWindow = 0 < rectBottom && rectBottom <= winHeight;
  // let all = rectTop == 0;
  console.log(
    "获取是否处于可视范围",
    rectTop,
    rectBottom,
    winHeight,
    isTopInWindow,
    isBottomInWindow
  );
  return isTopInWindow || isBottomInWindow;
};
