import {
	createStore,
	combineReducers,
	applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {
	createLogger
} from 'redux-logger'
import rootReducer from '../Reducer/index';

const loggerMiddleware = createLogger();

var store = createStore(
	rootReducer, // 将所有reducer组成一个新的reducer给唯一store运行
	applyMiddleware(
		thunkMiddleware, // 允许我们 dispatch() 函数
		loggerMiddleware // 一个很便捷的 middleware，用来打印 action 日志
	)
)

export default store;