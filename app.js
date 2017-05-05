/**
 * @Author: wangxu <ceekey>
 * @Date:   2017-04-20 19:01:41
 * @Email:  xu.wang@ishansong.com
 * @Project: terra
 * @Filename: app.js
 * @Last modified by:   ceekey
 * @Last modified time: 2017-05-05 13:54:21
 */

'use strict';

let koa = require('koa');
let app = koa();
let router = require('./routes/router').router;
let logger = require('koa-logger')
let koaBody = require('koa-better-body');
//支持x-www-form-urlencoded
//支持form-data
app.use(koaBody());


//webpack hot dev server
let webpack = require('webpack');
let webpackDevMiddleware = require('koa-webpack-dev-middleware');
let webpackHotMiddleware = require('koa-webpack-hot-middleware');
let config = require('./webpack.config')
let compiler = webpack(config);

let getApi = require('./middlewares/index').getApi;

let staticServer = require('koa-static');
app.use(staticServer(__dirname + '/lib'));


app.use(getApi);

// use webpack
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// time
app.use(function * (next) {
    let start = new Date;
    yield next;
    let ms = new Date - start;
    this.set('X-Response-Time', ms + 'ms');
});

app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

//listen

app.listen(3000);
