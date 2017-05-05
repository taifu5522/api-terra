/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 14:58:40
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: api.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-05 13:47:19
 */

'use strict';
let dao = require("../dao/daos");
let api = {};
let R = require('ramda');

class Api {
    constructor(props) {}
    static * register(next) {
        this.body = yield dao.user.register(this.request.fields);
    }
    static * login(next) {
        var result = yield dao.user.login(this.request.fields);
        //设置cookies userId
        if (!R.isNil(result.data)) {
            this.cookies.set("userId", result.data.userId, {maxAge: 1800000});
            result.data = true;
        }
        this.body = result;
    }
    static * savedoc(){
        var result = yield dao.doc.save(this.query.doc);
    }
}

module.exports = Api;
