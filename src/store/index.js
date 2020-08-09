// 创建一个store管理仓库，从redux库中引入一个createStore函数和applyMiddleware方法
import { createStore, applyMiddleware } from 'redux';
// 引入thunk中间件，实现异步action、打印日志、错误报告等功能，放入applyMiddleware方法之中
import thunk from 'redux-thunk';
import reducer from './reducers';

// 引入redux-persist库，全局数据持久化存储
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const myPersistReducer = persistReducer(persistConfig, reducer)

// 引入createStore后，store并没有创建，需要调用createStore()后才有store
const store = createStore(
    myPersistReducer,
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export const persistor = persistStore(store)

export default store