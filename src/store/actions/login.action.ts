// 用户登录action
export const USER_LOGIN = "USER_LOGIN";
export type USER_LOGIN_TYPE = typeof USER_LOGIN;

export interface loginType {
  type: USER_LOGIN_TYPE;
  info: any;
}

export const UserLogin = (info: object): loginType => {
  return {
    type: USER_LOGIN,
    info,
  };
};

// 用户注销action
export const USER_LOGINOUT = "USER_LOGINOUT";
export type USER_LOGINOUT = typeof USER_LOGINOUT;

export interface loginoutType {
  type: USER_LOGINOUT;
}

export const UserLoginout = (): loginoutType => {
  return {
    type: USER_LOGINOUT,
  };
};

// 校验login状态
export const CHECK_LOGIN_STATE = "CHECK_LOGIN_STATE";
export type CHECK_LOGIN_STATE = typeof CHECK_LOGIN_STATE;

export interface checkLoginStateType {
  type: CHECK_LOGIN_STATE;
}

export const CheckLoginState = (): checkLoginStateType => {
  return {
    type: CHECK_LOGIN_STATE,
  };
};
