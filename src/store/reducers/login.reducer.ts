import {
  CHECK_LOGIN_STATE,
  checkLoginStateType,
  loginoutType,
  loginType,
  USER_LOGIN,
  USER_LOGINOUT,
} from "../actions/login.action";
import { LocalStorage, SessionStorage } from "@/utils/storage";

type ModifyAction = loginType | loginoutType | checkLoginStateType;

export const userLogin = (
  state: boolean = false,
  action: ModifyAction
): boolean => {
  switch (action.type) {
    case USER_LOGIN:
      const { accessToken, refreshToken, ...userInfo } = action.info;
      SessionStorage.set("access_token", accessToken);
      LocalStorage.set("refresh_token", refreshToken);
      SessionStorage.set("user_info", userInfo);
      return true;
    case USER_LOGINOUT:
      SessionStorage.remove("access_token");
      LocalStorage.remove("refresh_token");
      SessionStorage.remove("user_info");
      return false;
    case CHECK_LOGIN_STATE:
      const info = SessionStorage.get("user_info");
      return info ? true : false;
    default:
      return state;
  }
};
