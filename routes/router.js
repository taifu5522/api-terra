/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-26 11:15:45
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: router.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 19:53:59
 */

'use strict'
let router = require('koa-router')();
let service = require('../server/service/services');
let R = require('ramda');
let config = require('../config/index')


/**
 *
 * API路由统一注册
 *
 */
R.forEach((type) => {
    let apis = type === 'get'
        ? config.api.getApi
        : config.api.postApi;
    let apiDeal = (value) => {
        router[type](value.url, service[value.service]);
    };
    R.forEach(apiDeal)(apis);
})(['get', 'post']);


module.exports = {
    router: router
}
