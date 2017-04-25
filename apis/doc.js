'use strict';
let codes = require('../config/index').stateCodes;
let common = require('../common');

//新增接口
module.exports.saveApi = function *(next){
    let data = this.query.api;
    console.log(JSON.parse(data))
    try{
        this.body = {
            status:200,
            err:'ok'
        };
        yield next;
    }catch(e){
        this.body = common.isType(e,'Object') ? e : {code:codes.notFind,message:e.message || e};
    };
}