/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-20 19:01:41
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: base.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 23:36:35
 */

'use strict'

let model = require('../../db/model/models').userModel;
let common = require('../../../common/server_common')

let register = function * (userInfo) {

    let userEntity = new model(userInfo);

    try {
        yield userEntity.save();
        return common.successHandle(true, '注册成功');
    } catch (e) {
        return common.errHandle(e, "注册失败");
    }
};

module.exports = {
    user: {
        register: register
    }
};
