import { ModifyAction } from "./../actions/user.action";
import { USER_LOGIN } from "../consts/user.const";
import { LocalStorage } from "@/utils/storage";

export const userReducer = (
  state: object = {},
  action: ModifyAction
): object => {
  switch (action.type) {
    case USER_LOGIN:
      console.log(action, state);
      const { accessToken, refreshToken, ...userInfo } = action.info;
      const localstorage = new LocalStorage();
      localstorage.set("access_token", accessToken);
      localstorage.set("refresh_token", refreshToken);
      localstorage.set("user_info", userInfo);
      return Object.assign({}, state, action);
    default:
      return state;
  }
};
