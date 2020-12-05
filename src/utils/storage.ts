/**
 * 封装storage数据转换操作，get数据转换待验证
 */

export class LocalStorage {
  localstorage: Storage;
  constructor() {
    this.localstorage = window.localStorage;
  }
  set(name: string, value: any) {
    if (!value) throw new Error("value is not empty");
    const type = Object.prototype.toString.call(value);
    this.localstorage.setItem(
      name,
      JSON.stringify({
        type,
        value,
      })
    );
  }
  get(name: string) {
    const value: any = this.localstorage.getItem(name);
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
        return JSON.parse(obj.value);
      case "[object Date]":
        return new Date(obj.value);
      default:
        throw new Error("data is error");
    }
  }
  remove(name: string) {
    this.localstorage.removeItem(name);
  }
  clear() {
    this.localstorage.clear();
  }
}
