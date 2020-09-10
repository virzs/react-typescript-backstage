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
