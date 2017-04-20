"use strict";
const CONFIG = require('../config/index');
const mongoose = require('mongoose');

class Dao {
    constructor() {
        // init
    }
    // 获取数据库连接
    static get connect() {
        if (!Dao.db) {
            const db = mongoose.createConnection(CONFIG.mongo.url);

            db.on('error', console.error.bind(console, '数据库连接错误:'));

            Dao.db = db;
        }

        return Dao.db;
    }
    static model(name , Schema){
        let newSchema = new mongoose.Schema(Schema);
        let db = this.connect;
        return {db:db,model:new db.model(name,newSchema)};
    }
    // 关闭数据库连接
    static destory() {
        if (Dao.db) {
            Dao.db.close()

            Dao.db = null
        }
    }
}
module.exports = Dao;
