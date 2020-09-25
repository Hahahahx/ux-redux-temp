import { Action, LocalStorage, SesstionStorage, Update } from "@/components/Provider/decorators";
import UserApi from "./service/UserApi";



class FileModule {

    @LocalStorage
    @SesstionStorage
    filename = 'FileModule';

    @SesstionStorage
    fileType = 'txt'

    @Update
    private update() { }

    @Action
    reqFile() {
        return UserApi.GetUserInfo('id1').then(res => {
            this.filename = 'FileModule被Action更新了';
            this.fileType = 'action'
        })
    }

    reqFilebyUpdate() {
        this.filename = 'FileModule被Update更新了';
        this.fileType = 'update'
        this.update()
    }
}


export default new FileModule()