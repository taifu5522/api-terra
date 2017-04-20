'use strict';

module.exports.base = {
    sUsername: String,
    sPassword: String,
    iPhone: Number,
    sEmail: String,
    sActiveToken:String,
    nActiveExpires:Number,
    bActive:{
        type:Boolean,default:false
    }
}