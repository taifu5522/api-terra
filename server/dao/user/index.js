/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-20 19:01:41
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: base.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-25 10:59:17
 */

'use strict'

let model = require('../../db/model/models').userModel;
let common = require('../../../common/server_common');
let R = require('ramda');
let redisClient = require('../../redis/index');
let md5 = require('md5');

let userDao = {
    user: {
        register: function * (userInfo) {

            userInfo.password = md5(common.unEncryptPassword(loginInfo.password));
            let userEntity = new model(userInfo);

            try {
                yield userEntity.save();
                return common.successHandle(true, '注册成功');
            } catch (e) {
                return common.errHandle(e, "注册失败", "用户已存在");
            }
        },
        login: function * (loginInfo) {

            //参数校验
            if (R.isNil(loginInfo)) {
                return common.errHandle({
                    code: 102
                }, "用户名或密码错误");
            }
            if (R.isEmpty(loginInfo.username) || R.isNil(loginInfo.username || R.isEmpty(loginInfo.password) || R.isNil(loginInfo.password))) {
                return common.errHandle({
                    code: 102
                }, "用户名或密码错误");
            }

            try {
                let result = yield model.findOne({
                    username: loginInfo.username,
                    password: md5(common.unEncryptPassword(loginInfo.password))
                });
                if (R.isEmpty(result) || result === null) {
                    return common.errHandle({
                        code: 102
                    }, "用户名或密码错误");
                } else {
                    redisClient.set(result._id.toString(), JSON.stringify(result.role), 'PX', 1800000);
                    return common.successHandle({
                        userId: result._id,
                        permission: result.role
                    }, '登录成功');
                }
            } catch (e) {
                return common.errHandle(e, "登录失败");
            }
        }
    }
}

module.exports = userDao;
