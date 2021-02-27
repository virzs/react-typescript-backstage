import { combineReducers, createStore } from "redux";
import { userLogin } from "./reducers/login.reducer";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage";

/**
 * Store文件
 */

// redux数据持久化配置
const reduxPersistConfig = {
  key: "root",
  storage: storageSession, //缓存方式
  blacklist: [], // 黑名单
};

// 合并reducers
const appReducers = combineReducers({ userLogin });

// 将合并的reducers添加到持久化配置中
// 将该函数验证设为any或具体类型可跳过persistStore函数的类型验证
// persistReducer<any,any>(xxx,xxx)
const appPersistReducers = persistReducer(reduxPersistConfig, appReducers);

// 创建store
const store = createStore(appPersistReducers);

export const persistor = persistStore(store);

export default store;
