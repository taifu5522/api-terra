'use strict';
let views = require('co-views');
let parse = require('co-body');
let co = require('co');

let render = views(__dirname + '/../lib', {
  map: {
    html: 'swig'
  }
});

module.exports.home = function * home(next) {
  if ('GET' != this.method) return yield next;
  this.body = yield render('index');
};
