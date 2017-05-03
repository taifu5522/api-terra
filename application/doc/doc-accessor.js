'use strict';

let Dao = require('../../db/main');
let docSchemas = require('../../db/schemas/doc');

class docAccessor{
    constructor(model){
        this.dao = new Dao();
        this.model = this.dao.model('doc',docSchemas[model]);
        return this.model;
    }
    save(){
        
    }
}


module.exports.docAccessor = docAccessor;
