import { notification } from "antd";

export class Exception {

    code: number
    msg: string

    constructor(code: number, msg: string) {
        this.code = code;
        this.msg = msg;
    }

    handle() {
        switch (this.code) {
            case 2001:
                notification.warn({
                    message: `登录异常`,
                    description:
                        '登录检测已退出，请重新登录！'
                })
                window.location.href = '/'
                break
            default:
                ;
        }
    }

}