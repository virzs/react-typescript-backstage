import { combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/user.reducer";

/**
 * Store文件
 */
const store = createStore(combineReducers({ userReducer }));

export default store;
