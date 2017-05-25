/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 23:21:30
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: common.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-08 10:48:47
 */

'use strict'

let R = require('ramda');

class Common {
    /**
     *
     * 密码加密算法
     * @params:password (加密前密码)
     */
    static encryptPassword(password) {
        let encryptResult = "";
        R.forEach((v) => {
            encryptResult += String.fromCharCode(v.charCodeAt() + 5);
        })(password);
        return encryptResult;
    }
    /**
     *
     * 密码解密算法
     * @params:password (加密后密码)
     */
    static unEncryptPassword(password) {
        let unEncryptResult = "";
        R.forEach((v) => {
            unEncryptResult += String.fromCharCode(v.charCodeAt() - 5);
        })(password);
        return unEncryptResult;
    }
    static isType(obj, type) {
        return type
            ? Object.prototype.toString.call(obj) === '[object ' + type + ']'
            : Object.prototype.toString.call(obj).split(' ')[1].split(']')[0];
    }
}

module.exports = Common;
