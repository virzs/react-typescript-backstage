// 设置当前路由信息
export const SET_CURRENT = "SET_CURRENT";
export type SET_CURRENT = typeof SET_CURRENT;
export interface setCurrentTypes {
  type: SET_CURRENT;
  route: any;
}
// 获取当前路由信息
export const GET_CURRENT = "GET_CURRENT";
export type GET_CURRENT = typeof GET_CURRENT;
// 设置当前的路由信息
export const setCurrent = (route: any): setCurrentTypes => {
  return {
    type: SET_CURRENT,
    route,
  };
};
