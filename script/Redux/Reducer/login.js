/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-02 02:39:26
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: login.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 11:20:10
 */



let initialState = {
    login: {
        status: -1
    }
};
const login = (state = initialState, action) => { // 此处action为之后传入，首次默认只传入空对象
    switch (action.type) {
        case 'REMEMBER_LOGIN_INFO':
            return {
                state
                // login: {
                // 	status: state.login.status,
                // 	userName: action.info.userName,
                // 	password: action.info.password
                // }
            };
        case 'LOGIN_START':
            return {
                state,
                login: {
                    status: 0
                }
            };
        case 'LOGIN_SUCCESS':
            return {
                state,
                login: {
                    status: 1
                }
            };
        case 'LOGIN_FAILED':
            return {
                state,
                login: {
                    status: 2,
                    error: action.error
                }
            }
        default:
            return state;
    }
}
export default login;
