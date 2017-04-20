'use strict'

module.exports.isType = function(obj,type){
    return type ? Object.prototype.toString.call(obj) === '[object ' + type + ']' : Object.prototype.toString.call(obj).split(' ')[1].split(']')[0];
}