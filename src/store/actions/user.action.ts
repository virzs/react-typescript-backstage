import { USER_LOGIN } from "../consts/user.const";

export interface LOGIN_TYPE {
  type: USER_LOGIN;
  info: any;
}

export type ModifyAction = LOGIN_TYPE;

export const UserLogin = (info: object): LOGIN_TYPE => {
  return {
    type: USER_LOGIN,
    info,
  };
};
