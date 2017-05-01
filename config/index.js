/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-20 19:01:41
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: index.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-04-30 20:58:10
 */

'use strict'

module.exports = {
    site: {
        type: process.env.EVN_TYPE || 'development',
        port: process.env.PORT || 80
    },
    //数据库-mongodb
    mongodb: {
        url: 'mongodb://120.27.158.158:27017/virtualService',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 300000,
                    connectTimeoutMS: 15000
                }
            }
        }
    },
    stateCodes: {
        success: 200,
        exists: 1001, // 已存在
        notFind: 404 // 未找到
    }
}
