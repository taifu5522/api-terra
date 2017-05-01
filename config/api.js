/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 17:57:01
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: api.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 20:08:32
 */

'use strict'

module.exports = {
    getApi: [],
    postApi: [
        {
            url: '/api/user/register',
            service: 'register'
        }
        // , {
        //     url: '/api/user/login',
        //     service: 'login'
        // }, {
        //     url: '/api/user/logout',
        //     service: 'logout'
        // }
    ]
}
