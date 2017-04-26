import test from 'common/publics';
let Tester = new test();


function dataStore(data){
    if(data){
        this.data = data;
    }
}
dataStore.prototype.data = {};
dataStore.prototype.getData = function(){
    return this.data;
}
dataStore.prototype.add = function(name,type){
    let findName = name.split('.');
    let addName = findName.pop();
    findName = findName.join('.');
    let data = this.findKey(findName);
    if(!data){
        this.data[addName] = type;
    }else{
        if(Tester.isType(data,'Object')){
            data[addName] = type;
        }else{
            return {
                state:false,
                msg:'字段不为Objcet!'
            };
        }
    }
    return this.data;
}
dataStore.prototype.update = function(name,newVal){
    let data = this.find(name);
    let changeName = name.split('.').pop();
    data[changeName] = newVal;
    return this.data;
}
dataStore.prototype.find = function(name,data){
    data = data ? data : this.data;
    let names = name.split('.');
    let key = names.shift();
    if(names.length){
        return this.find(names.join('.'),data[key]);
    }
    return data;
}
dataStore.prototype.findKey = function(name){
    let data = this.find(name);
    let keyName = name.split('.').pop();
    return data[keyName];
}
dataStore.prototype.delete = function(name){
    let data = this.find(name);
    let deleteName = name.split('.').pop();
    delete data[deleteName];
    return this.data;
}

export default {
    dataStore
}