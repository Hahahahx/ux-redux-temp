import {Action} from '@/components/Provider';
import UserApi from '@/modules/service/UserApi';
import {User} from '@/modules/model/User';

export class UserModule{

    static user = new User();
    static login = false;

    @Action
    private static update() {
    }

    static reqUser() {
        UserApi.GetUserInfo('id1').then(res=>{
            UserModule.user = res.result
            UserModule.update()
        })
    }
}


