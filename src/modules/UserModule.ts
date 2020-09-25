import UserApi from '@/modules/service/UserApi';
import { User } from '@/modules/model/User';
import { Action } from '@/components/Provider/decorators';

class UserModule {

    user = new User();
    login = false;

    @Action
    reqUser() {
        return UserApi.GetUserInfo('id1').then(res => {
            this.user = res.result;
        })
    }
}


export default new UserModule();