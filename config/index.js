/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-20 19:01:41
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: index.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 20:51:29
 */

'use strict'

let mongoConfig = require('./mongo');
let apiConfig = require('./api');

module.exports = {
    site: {
        type: process.env.EVN_TYPE || 'development',
        port: process.env.PORT || 80
    },
    //数据库
    mongo: {
        url: 'mongodb://127.0.0.1:27017/api-terra',
        prot:27017,
        max:30,
        min:5,
    },
    stateCodes:{
        success:200,
        exists:1001, // 已存在
        notFind:404 // 未找到
    },
    //database-mongodb
    mongodb: mongoConfig,
    //api-service
    api: apiConfig,
    //struct
    struct: {
        status: null,
        data: null,
        err: null,
        message: null
    }
}
