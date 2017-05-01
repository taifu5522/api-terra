/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 15:41:05
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: models.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 19:52:35
 */

'use strict';

let mongoose = require('mongoose');
let db = require('../database');

//用户model
let userModel = require('./user/user_model');

module.exports = {
    userModel: userModel
};
