'use strict'
let router = require('koa-router')();
let views = require('../views/index');
let user = require('../apis/user');

//首页
router.get('/',views.home);
router.get('/view',views.home);

router.get('/user/UserBase/:func',user.base);
router.post('/user/UserBase/:func',user.base);

router.get('/user/loginIn',function *(next){
	this.body = 'loginIn';
});

module.exports = {
    router:router
}