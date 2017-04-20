'use strict'

module.exports = {
    site: {
        type: process.env.EVN_TYPE || 'development',
        port: process.env.PORT || 80
    },
    //数据库
    mongo: {
        url: 'mongodb://127.0.0.1:27017/activity'
    },
    stateCodes:{
        success:200,
        exists:1001, // 已存在
        notFind:404 // 未找到
    }
}