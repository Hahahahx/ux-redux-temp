import { Update } from "@/components/Provider/decorators";


/**
 * @File: PageModule
 * @Author: Ux
 * @Date: 2020/9/25
 * @Description: 页面状态层，记录路由状态等。
 */
class PageModule {
    pathList: string[] = [];
    location: Location = window.location;

    @Update
    private update() {
    }

    actionLocation(location: Location) {
        const pageList = location.pathname.split('/').splice(1);
        if (pageList.join('') !== this.pathList.join('')) {
            this.location = location;
            this.pathList = pageList;
            this.update();
        }
    };
}

export default new PageModule();