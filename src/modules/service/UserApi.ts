/**
 * @File: UserApi.ts
 * @Author: Ux
 * @Date: 2020/9/23
 * @Description:
 */
import {request} from '@/modules/ajax/request';
import {Response} from '@/modules/ajax/response';
import {User} from '@/modules/model/User';

class UserApi {
    PostLogin(params: LoginParams): Promise<Response<any>> {
        return request.post('/user/login', params);
    }

    GetUserInfo(id: string): Promise<Response<User>> {
        return request.get('/user/userInfo', {id})
            .then(res=>{
                return res.result;          // as User
            });
    }
}

export default new UserApi();

export interface LoginParams {
    username: string,
    password: string
}
