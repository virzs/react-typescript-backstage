import {
  LOGINOUT_TYPE,
  LOGIN_TYPE,
  USER_LOGIN,
  USER_LOGINOUT,
} from "./../actions/user.action";
import { LocalStorage } from "@/utils/storage";

type ModifyAction = LOGIN_TYPE | LOGINOUT_TYPE;

export const userLogin = (
  state: boolean = false,
  action: ModifyAction
): boolean => {
  switch (action.type) {
    case USER_LOGIN:
      const { accessToken, refreshToken, ...userInfo } = action.info;
      LocalStorage.set("access_token", accessToken);
      LocalStorage.set("refresh_token", refreshToken);
      LocalStorage.set("user_info", userInfo);
      return true;
    case USER_LOGINOUT:
      LocalStorage.remove("access_token");
      LocalStorage.remove("refresh_token");
      LocalStorage.remove("user_info");
      return false;
    default:
      return state;
  }
};
