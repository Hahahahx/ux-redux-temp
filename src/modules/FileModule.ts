import { Action, LocalStorage, SesstionStorage, Update } from "@/components/Provider/decorators";
import UserApi from "./service/UserApi";

/**
 * 状态模块：*Module
 * 状态事件：action*
 * update只能命名为update，且应该是private的
 */

class FileModule {

    @LocalStorage
    @SesstionStorage
    filename = 'FileModule';

    @SesstionStorage
    fileType = 'txt'

    @Update
    private update() { }

    @Action
    actionFile() {
        return UserApi.getUserInfo('id1').then(res => {
            this.filename = 'FileModule被Action更新了';
            this.fileType = 'action'
        })
    }

    actionFileByUpdate() {
        this.filename = 'FileModule被Update更新了';
        this.fileType = 'update'
        this.update()
    }
}


export default new FileModule()