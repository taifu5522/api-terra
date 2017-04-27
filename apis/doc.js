'use strict';
let codes = require('../config/index').stateCodes;
let common = require('../common');
let DataCreator = require('../application/doc/data-creator');

//新增接口
module.exports.saveApi = function *(next){
    let data = this.query.api;
    try{
        let apiModel = JSON.parse(data);
        let apiData = new DataCreator(apiModel);
        this.body = {
            status:200,
            err:'ok',
            data:apiData
        };
        yield next;
    }catch(e){
        this.body = common.isType(e,'Object') ? e : {code:0,message:e.message || e};
    };
}