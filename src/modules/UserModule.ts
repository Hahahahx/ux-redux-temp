import { action, observable } from 'mobx'

export class UserModule {

    @observable
    user = 'UX'


    @action
    setUser = () => {
        if(this.user === 'Hux'){
            this.user = 'UX'
        }else{
            this.user = 'Hux'
        }
    }

}
