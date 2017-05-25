/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-02 02:35:38
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: index.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 11:20:01
 */



import {combineReducers} from 'redux';
import login from './login';
import post from './post';

export default combineReducers({login, post});
