'use strict'
let router = require('koa-router')();
let views = require('../views/index');
let user = require('../apis/user');
let doc = require('../apis/doc');

//首页
router.get('/',views.home);
router.get('/view',views.home);

router.get('/user/UserBase/:func',user.base);
router.post('/user/UserBase/:func',user.base);

router.get('/user/loginIn',function *(next){
	this.body = 'loginIn';
});

//api文档相关操作
router.get('/doc/save',doc.saveApi);

module.exports = {
    router:router
}