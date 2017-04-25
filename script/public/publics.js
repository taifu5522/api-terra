class publics{
    constructor(){
        
    }
    deep(b, c){
        var c = c || {};
        try{
            Object.assign(c,b);
            return c;
        }catch(e){
            console.log(e)
        }
    }
    isType(obj,type){
        return type ? Object.prototype.toString.call(obj) === `[object ${type}]` : Object.prototype.toString.call(obj).split(' ')[1].split(']')[0];
    }
}

export default publics;