import {createStore, combineReducers} from 'redux';
import * as reducer from '../Reducer/reducer';
import { ADD_TODO } from '../Action/action';

var store = createStore(
    combineReducers(reducer) // 将所有reducer组成一个新的reducer给唯一store运行
)

export default store;