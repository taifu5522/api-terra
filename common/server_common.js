/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 23:17:13
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: server_common.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-05 11:46:29
 */

'use strict'

let Common = require('./common');
let R = require('ramda');
let struct = require('../config/index').struct;

class ServerCommon extends Common {
    /**
     *
     * 连接mongodb校验失败错误信息
     * @params:err(mongoErr)
     */
    static connactErrMessage(err) {
        var message = "";
        R.forEachObjIndexed((v, k) => {
            message += v.message + ",";
        })(err.errors);
        return message.substr(0, message.length - 1);
    }
    /**
     *
     * 接口操作成功数据格式拼接
     * @params:data (返回数据)
     * @params:message (提示信息)
     */
    static successHandle(data, message) {
        let result = R.clone(struct);
        result.status = 200;
        result.data = data;
        result.message = message;
        return result;
    }
    /**
     *
     * 接口操作成功数据格式拼接
     * @params:err (捕捉到的错误)
     * @params:message (提示信息)
     * @params:uniqueMessage (唯一性校验提示)（可选参数）
     */
    static errHandle(err, message, uniqueMessage) {
        uniqueMessage = uniqueMessage || "唯一性校验不通过";
        let result = R.clone(struct);
        if (err.code === 11000) {
            result.status = 101;
            result.message = uniqueMessage;
        } else if (err.name === "ValidationError") {
            result.status = 100;
            result.err = err;
            result.message = connactErrMessage(err);
        } else if(err.code === 102) {
            result.status = 102;
            result.err = null;
            result.message = message;
        }else{
            result.status = 500;
            result.err = err;
            result.message = message;
        }
        return result;
    }
}

module.exports = ServerCommon;
