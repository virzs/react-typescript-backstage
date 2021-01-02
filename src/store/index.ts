import { createStore } from "redux";
import { userReducer } from "./reducers/user.reducer";

/**
 * Store文件
 */
const store = createStore(userReducer);

export default store;
