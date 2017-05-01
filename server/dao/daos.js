/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 15:18:01
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: dao.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 19:49:27
 */

'use strict'

let R = require('ramda');
let dao = {};

//用户DAO模块
let user = require('./user/index')

dao = R.merge(dao,user);

module.exports = dao;
