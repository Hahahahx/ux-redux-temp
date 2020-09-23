import {Action} from '@/components/Provider';

export class UserModule{

    static user = 'UX';
    static login = false;

    @Action
    private static update() {
    }

    static reqUser() {
        setTimeout(() => {
            UserModule.user = 'ddd';
            UserModule.update()
        }, 1000);
    }
}


