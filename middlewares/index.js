'use strict'
module.exports.getApi = function *(next){
    let path = this.path.split('/');
    path.splice(0,1);
    this.apiPath = path.length > 1 ? path.splice(1,path.length-1) : null;
    yield next;
}