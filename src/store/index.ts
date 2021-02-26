import { combineReducers, createStore } from "redux";
import { userLogin } from "./reducers/user.reducer";

/**
 * Store文件
 */

const appReducers = combineReducers({ userLogin });

const store = createStore(appReducers, {
  userLogin: false,
});

export default store;
