'use strict';
let koa = require('koa');
let app = koa();
let router = require('./routes/router').router;
var logger = require('koa-logger')
 
//webpack hot dev server
let webpack = require('webpack');
let webpackDevMiddleware = require('koa-webpack-dev-middleware');
let webpackHotMiddleware = require('koa-webpack-hot-middleware');
let config = require('./webpack.config')
let compiler = webpack(config);

let getApi = require('./middlewares/index').getApi;

var staticServer = require('koa-static');
app.use(staticServer(__dirname + '/lib'));

app.use(getApi);

//use webpack
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

// time
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

app.use(logger());

app
  .use(router.routes())
  .use(router.allowedMethods());

//listen

app.listen(3000);
