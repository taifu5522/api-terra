/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-20 19:01:41
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: main.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-03 17:17:34
 */

"use strict";
let CONFIG = require('../../config/index');
let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let db = mongoose.connect(CONFIG.mongodb.url, CONFIG.mongodb.options);

db.connection.on('error', (err) => {
    console.log("db connect error!", err);
});
db.connection.once('open', () => {
    console.log("db connect successful!");
});
module.exports = db;
