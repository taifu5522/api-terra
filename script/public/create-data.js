function dataCreator(apiModal){
    this.apiModal = apiModal;
    this.data = this.deep();
}
dataCreator.prototype.deep = function(data){
    data = data || this.apiModal.data;
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
            return Math.random() * 10000;
        case 'Boolean':
            return Math.floor(Math.random() * 10) > 5;
        case 'String':
            return 'aaaaaa';
    }
}

export default dataCreator;
