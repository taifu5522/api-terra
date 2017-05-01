/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 18:41:00
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: user.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 19:51:22
 */

'use strict';

let mongoose = require('mongoose');
let schemas = require('../../schema/schemas');
let userModel = mongoose.model('user', schemas.userSchema);

module.exports = userModel;
