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
}

export const publicObj = new publics();