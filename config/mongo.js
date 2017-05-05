/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 17:58:43
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: mongodb.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-03 16:17:59
 */
'use strict'

module.exports = {
    //ECS
    //url: 'mongodb://120.27.158.158:27017/virtualService',
    //local
    url: 'mongodb://127.0.0.1/virtualService',
    options: {
        server: {
            socketOptions: {
                keepAlive: 300000,
                connectTimeoutMS: 15000
            },
            auto_reconnect: true,
            poolSize: 5
        }
    }
}
