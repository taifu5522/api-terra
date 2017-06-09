'use strict';

let model = require('../../db/model/models').docModel;
let common = require('../../../common/server_common');
let R = require('ramda');

let docDao = {
    docAccess:{
        save:function * (doc){
            doc = JSON.parse(doc);
            let docEntity = new model(doc);
            try{
                let oldData = yield model.find({name:doc.name})
                if(oldData.length){
                    yield model.update({
                        name:doc.name,
                        element:doc.data
                    });
                }
                return common.successHandle(doc, '保存成功');
            }catch(e){
                console.log(e)
                return common.successHandle(e, '保存失败');
            }
        }
    }
}

module.exports = docDao;
