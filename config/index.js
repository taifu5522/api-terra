/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-20 19:01:41
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: index.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-03 14:31:47
 */

'use strict'

let mongoConfig = require('./mongo');
let redisConfig = require('./redis');
let apiConfig = require('./api');

module.exports = {
    //database-mongodb
    mongodb: mongoConfig,
    redis: redisConfig,
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
