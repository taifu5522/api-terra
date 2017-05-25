/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-02 01:49:52
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: action.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 11:19:45
 */

import 'babel-polyfill'
import fetch from 'isomorphic-fetch'

export const LOGIN = 'LOGIN';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const REMEMBER_LOGIN_INFO = 'REMEMBER_LOGIN_INFO';

export function loginStart(url) {
    return {type: LOGIN_START, url}
}

export function loginSuccess(json) {
    return {type: LOGIN_SUCCESS, json}
}

export function loginFailed(error) {
    return {type: LOGIN_FAILED, error}
}

export function rememberLoginInfo({username, password}) {
    return {
        type: REMEMBER_LOGIN_INFO,
        info: {
            username,
            password
        }
    }
}

export function login(info) {
    let url = '/api/user/login';
    return dispatch => {
        dispatch(loginStart(url));
        return fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(info)
        }).then(response => {
            info.remember && dispatch(rememberLoginInfo(info));
            return response.json()
        }).then(json => dispatch(loginSuccess(json))).catch(error => {
            dispatch(loginFailed(error));
        })
    }
}
