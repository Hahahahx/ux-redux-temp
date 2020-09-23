
export class Response<T>{
    code:number
    result:T
    msg:string
    constructor(code:number,result:T,msg:string){
        this.code = code;
        this.result = result;
        this.msg = msg
    }
}