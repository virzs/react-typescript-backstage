// 用户登录action
export const USER_LOGIN = "USER_LOGIN";
export type USER_LOGIN_TYPE = typeof USER_LOGIN;

export interface LOGIN_TYPE {
  type: USER_LOGIN_TYPE;
  info: any;
}

export const UserLogin = (info: object): LOGIN_TYPE => {
  return {
    type: USER_LOGIN,
    info,
  };
};

// 用户注销action
export const USER_LOGINOUT = "USER_LOGINOUT";
export type USER_LOGINOUT = typeof USER_LOGINOUT;

export interface LOGINOUT_TYPE {
  type: USER_LOGINOUT;
}

export const UserLoginout = (): LOGINOUT_TYPE => {
  return {
    type: USER_LOGINOUT,
  };
};
