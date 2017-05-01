/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-20 19:01:41
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: base.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-02 02:15:33
 */

'use strict'

let model = require('../../db/model/models').userModel;
let common = require('../../../common/server_common');
let R = require('ramda');

let userDao = {
    user: {
        register: function * (userInfo) {

            let userEntity = new model(userInfo);

            try {
                yield userEntity.save();
                return common.successHandle(true, '注册成功');
            } catch (e) {
                return common.errHandle(e, "注册失败", "用户已存在");
            }
        },
        login: function * (loginInfo) {
            if (R.isNil(loginInfo)) {
                return common.errHandle({
                    code: 102
                }, "用户名或密码错误");
            }
            if (R.isEmpty(loginInfo.username) || R.isNil(loginInfo.username)) {
                return common.errHandle({
                    code: 102
                }, "用户名或密码错误");
            }
            if (R.isEmpty(loginInfo.password) || R.isNil(loginInfo.password)) {
                return common.errHandle({
                    code: 102
                }, "用户名或密码错误");
            }
            try {
                let result = yield model.find(loginInfo);
                if (R.isEmpty(result)) {
                    return common.errHandle({
                        code: 102
                    }, "用户名或密码错误");
                } else {
                    return common.successHandle(true, '登录成功');
                }
            } catch (e) {
                return common.errHandle(e, "登录失败");
            }
        }
    }
}

module.exports = userDao;
