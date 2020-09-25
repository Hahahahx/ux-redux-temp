import { LocalStorage, SesstionStorage, Update } from "@/components/Provider/decorators";



class FileModule {

    @LocalStorage
    @SesstionStorage
    filename = 'FileModule';

    @SesstionStorage
    fileType = 'txt'

    @Update
    private update() {
    }

    reqFile() {
        this.filename = 'FileModule被更新了';
        this.fileType = 'png'
        this.update();
    }
}


export default new FileModule()