/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 14:58:40
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: api.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-02 02:08:31
 */

'use strict';
let dao = require("../dao/daos");
let api = {};

class Api {
    constructor(props) {}
    static * register(next) {
        this.body = yield dao.user.register(this.query);
    }
    static * login(next) {
        this.body = yield dao.user.login(this.request.fields);

    }
}

module.exports = Api;
