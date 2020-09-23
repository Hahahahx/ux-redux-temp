/**
 * @File: User
 * @Author: Ux
 * @Date: 2020/9/23
 * @Description:
 */

export class User {
    name:string = 'ux'
    birthYear:number = 1998

    get age(){
        return new Date().getFullYear() - this.birthYear;
    }
}