'use strict';
let codes = require('../config/index').stateCodes;
let common = require('../common');
let DataCreator = require('../application/doc/data-creator');
let docAccessor = require('../application/doc/doc-accessor');

//新增接口
module.exports.saveApi = function *(next){
    let data = this.query.api;
    try{
        let apiModel = JSON.parse(data);
        let a = this.db.model('userbase',{a:String});
        console.log(a)
        let apiData = new DataCreator(apiModel);
        this.body = {
            status:200,
            err:'ok',
            data:apiData
        };
        yield next;
    }catch(e){
        console.log(e.stack)
        this.body = common.isType(e,'Object') ? e : {code:0,message:e.message || e};
    };
}