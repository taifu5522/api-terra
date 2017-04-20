'use strict';
let DB = require('../../db/main');
let userSchema = require('../../db/schemas/user');
let co = require('co');
let codes = require('../../config/index').stateCodes;

class UserBase{
    constructor(data){
        this.username = data.username || null;
        this.token = data.token || null;
        this.data = data;
    }

    /**
     * 注册账号
     * @params username {string} 用户名
     * @params password {string} 密码
     * @return {object} 注册信息
     */
    register(username,password){
        return (fn)=>{
            co(function *(){
                let db = DB.model('userbase',userSchema.base);
                let user = yield db.model.find(this.data);
                if(user.length){
                    fn('用户名已存在',this.data)
                }else{
                    let newUser = yield db.model.create(this.data);
                    fn(null,{
                        code:codes.seccuss,
                        message:'注册成功!',
                        data:this.data
                    })
                    db.destory();
                }
            }.bind(this))
        }
    }

    getBaseInfo(){
        return (fn) => {
            co(function *(){
                let db = DB.model('userbase',userSchema.base);
                let user = yield db.model.find(this.data);
                fn(null,user);
            }.bind(this))
        }
    }

    loginIn(){
        return (fn)=>{
            co(function *(){
                let db = DB.model('userbase',userSchema.base);
                let user = yield db.model.find({user:this.username})
                if(user && user.password === this.data.password){
                    fn(null,{
                        code:codes.seccuss,
                        message:'登陆成功!',
                        data:this.data
                    })
                }
                fn('用户名或密码错误',this.data)
            }.bind(this))
        }
    }

}

module.exports = UserBase