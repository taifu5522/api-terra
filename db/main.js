"use strict";
const CONFIG = require('../config/index');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const common = require('../common');
const config = require('../config/index');

class Dao {
    constructor() {
        // init
    }
    // 获取数据库连接
    static get connect() {
        if (!this.db) {
            mongoose.createConnection(CONFIG.mongo.url,{
                auto_reconnect:true,
                poolSize:10
            },function(err, res){
                if(err){
                    console.log('[mongoose log] Error connecting to: ' + connectionString + '. ' + err);
                }else{
                    console.log('[mongoose log] Successfully connected to: ' + CONFIG.mongo.url);
                }
            });

            //db.on('error', console.error.bind(console, '数据库连接错误:'));

            this.db = mongoose.connection;
            this.db.on('error', console.error.bind(console, 'mongoose connection error:'));
            this.db.once('open', function callback () {
                console.log('mongoose open success');
            });
        }

        return this.db;
    }
    static model(name , SchemaName){
        if(!SchemaName) return {err:'TypeError:'+ SchemaName +' is not defind!',state:config.stateCodes.notFind}
        let Schema = new mongoose.Schema(SchemaName);
        let db = this.connect;
        return {db:db,model:new db.model(name,Schema),state:config.stateCodes.success};
    }
    // 关闭数据库连接
    static destory() {
        if (this.db) {
            this.db.close()

            this.db = null
        }
    }
}
module.exports = Dao;
