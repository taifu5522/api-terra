'use strict';

let mongoose = require('mongoose');
let docSchema = new mongoose.Schema({
    name:{type:String, trim:true, required:[true,'请填写正确的接口名称'], unique:true},
    data:{type:Object, trim:true, required:[true,'请定义正确的数据结构'], unique:true}
}, {
    collection: 'doc',
    versionKey: false
});

module.exports = docSchema;
