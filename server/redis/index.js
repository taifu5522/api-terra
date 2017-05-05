/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-03 14:27:31
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: index.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-05 11:26:48
 */

'use strict'

let redis = require('redis');
let redisConfig = require('../../config/index').redis;

let client = redis.createClient(redisConfig);

client.on("ready", function() {
    console.log("redis connect successful!");
});

client.on("error", function(err) {
    console.log("redis connect err: " + err);
});



module.exports = client;
