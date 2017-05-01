/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 17:58:43
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: mongodb.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 18:03:50
 */
'use strict'

module.exports = {
    //王旭-ECS
    // url: 'mongodb://120.27.158.158:27017/virtualService',
    //王旭-local
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
