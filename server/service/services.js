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
const dao = require("../dao/daos");
const api = {};
const R = require('ramda');
const fs = require('co-fs');
const path = require('path');

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
    static * doc_save(next){
        this.body = yield dao.docAccess.save(this.query.api);
    }
    static * browser_api(next){
        const body = yield fs.readFile(path.resolve(__dirname,'../../lib/index.html'));
        this.body = body.toString('utf-8')
    }
}

module.exports = Api;
