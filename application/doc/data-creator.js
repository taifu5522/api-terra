'use strict';

function dataCreator(apiModel){
    this.apiModel = apiModel;
    this.data = this.deep();
    return this.data;
}
dataCreator.prototype.deep = function(data){
    data = data || this.apiModel.data;
    let apiData = {};
    Object.keys(data).map(key=>{
        apiData[key] = this.createData(data[key]);
    })
    return apiData;
}
dataCreator.prototype.createData = function(api){
    let type = api.type;
    switch(type){
        case 'Null':
            return null;
        case 'Object':
            let data = null 
            Object.keys(api.val).map((key)=>{
                data = this.deep(api.val);
            })
            return data;
        case 'Array':
            let arr = [];
            let n = Math.floor(Math.random() * 30),i;
            for(i=0;i<n;i++){  
                arr.push(this.createData(api.val))
            } 
            return arr;
        case 'Number':
            return this.getRandomNum(5);
        case 'Boolean':
            return Math.floor(Math.random() * 10) > 5;
        case 'String':
            return this.randomText(Math.floor(Math.random() * 30));
        case 'Phone':
            return Number(`1${this.getRandomItem([3,5,7,8])}${this.getRandomNum(9)}`);
        case 'Email':
            return `${this.getRandomStr(7)}@ishansong.com`
    }
}
dataCreator.prototype.randomText = function (_len){
	var i=0;
	var _str = "";
	var _base = 20000;
	var _range = 1000;
	while(i < _len){
		i++;
		var _lower = parseInt(Math.random() * _range);
		_str += String.fromCharCode(_base + _lower);
	}
	return _str;
}
dataCreator.prototype.getRandomItem = function(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}
dataCreator.prototype.getRandomNum = function(len){
    let num = ``,i;
    for(i=0;i<len;i++){
        num += Math.floor(Math.random() * 10);
    }
    return Number(num)
}
dataCreator.prototype.getRandomStr = function(len){
    let str = ``,i;
    for(i=0;i<len;i++){
        str += String.fromCharCode(97 + Math.floor(Math.random() * 26));
    }
    return str;
}

module.exports =  dataCreator;
