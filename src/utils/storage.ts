/**
 * 封装storage数据转换操作，get数据转换待验证
 */
class storage {
  storage: any;
  constructor(name: string) {
    this.storage =
      name === "local" ? window.localStorage : window.sessionStorage;
  }
  set(name: string, value: any) {
    if (!value) throw new Error("value is not empty");
    const type = Object.prototype.toString.call(value);
    this.storage.setItem(
      name,
      JSON.stringify({
        type,
        value,
      })
    );
  }
  get(name: string) {
    const value: any = this.storage.getItem(name);
    if (!value) return;
    const obj = JSON.parse(value);
    switch (obj.type) {
      case "[object String]":
        return obj.value;
      case "[object Number]":
        return Number(obj.value);
      case "[object Symbol]":
        return Symbol(obj.value);
      case "[object BigInt]":
        return BigInt(obj.value);
      case "[object Null]":
        return null;
      case "[object Undefined]":
        return undefined;
      case "[object Boolean]":
        return JSON.parse(obj.value);
      case "[object Object]":
        return Object.entries(obj.value);
      case "[object Array]":
        return obj.value;
      case "[object Date]":
        return new Date(obj.value);
      default:
        throw new Error("data is error");
    }
  }
  remove(name: string) {
    this.storage.removeItem(name);
  }
  clear() {
    this.storage.clear();
  }
}

export const LocalStorage = new storage("local");
export const SessionStorage = new storage("session");
