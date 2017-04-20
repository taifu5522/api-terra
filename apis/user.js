'use strict';
let UserBase = require('../application/user/base');
let codes = require('../config/index').stateCodes;
let common = require('../common');

//用户基础信息
module.exports.base = function *(next){
    let func = this.params.func;
    let base = new UserBase(this.query);
    try{
        let user = yield base[func](this.query.username,this.query.password);
        if(user){
            this.body = user;
        };
        yield next;
    }catch(e){
        this.body = common.isType(e,'Object') ? e : {code:codes.notFind,message:e.message || e};
    };
}