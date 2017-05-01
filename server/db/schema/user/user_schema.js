/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-05-01 18:39:47
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: user.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-01 23:00:42
 */

'use strict';

let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    username: { type: String, trim: true, required: [true,'请填写用户名'] , unique: true },
    password: { type: String, trim: true, required: [true,'请填写密码'] },
    ctime: {type:Number,default:Date.now()},
    mtime: {type:Number,default:Date.now()},
    email: { type: String, trim: true, required: [true,'请填写邮箱'] },
    nickname: { type: String, trim: true, required: [true,'请填写昵称'] },
    role: { type:Array,default:[]}
}, {
    collection: 'user',
    versionKey: false
});

module.exports = userSchema;
