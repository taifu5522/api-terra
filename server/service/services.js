/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 14:58:40
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: api.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 22:42:34
 */

'use strict';
let dao = require("../dao/daos");
let api = {};

class Api {
    constructor(props) {}
    * register(next) {
        console.log(this.query);
        let userInfo = {};
        userInfo.username= this.query.username;
        userInfo.password= this.query.password;
        userInfo.email= this.query.email;
        userInfo.nickname= this.query.nickname;
        this.body = yield dao.user.register(userInfo);
    }
}

module.exports = new Api();
