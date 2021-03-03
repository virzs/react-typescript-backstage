// 设置当前路由信息
export const SET_CURRENT = "SET_CURRENT";
export type SET_CURRENT = typeof SET_CURRENT;
export interface setCurrentTypes {
  type: SET_CURRENT;
  route: any;
}
// 自定义当前route的name
export const SET_CURRENT_NAME = "SET_CURRENT_NAME";
export type SET_CURRENT_NAME = typeof SET_CURRENT_NAME;
export interface setCurrentNameTypes {
  type: SET_CURRENT_NAME;
  name: string;
}

// 设置当前的路由信息
export const setCurrent = (route: any): setCurrentTypes => {
  return {
    type: SET_CURRENT,
    route,
  };
};

//自定义当前route的name
export const setCurrentName = (name: string): setCurrentNameTypes => {
  return {
    type: SET_CURRENT_NAME,
    name,
  };
};
