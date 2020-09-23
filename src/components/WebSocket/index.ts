/**
 * @File: index.ts
 * @Author: Ux
 * @Date: 2020/7/27
 * @Description: socket对象
 */

/**
 * socket自定义事件
 */
export interface SocketOperate {
    socketOpen?: () => void,
    socketReceive?: (msg: MessageEvent) => void,
    socketClose?: (e: CloseEvent) => void,
    socketError?: (e: Event) => void
}

/**
 * socket对象
 */
export class Socket {
    // 链接
    url: string;
    // 超时
    timeout: number;
    // 自定义事件
    operate: SocketOperate | undefined;
    // socket对象
    socket: WebSocket | undefined;
    // 是否连接
    isConnect: boolean;

    constructor(url: string, timeout: number, operate?: SocketOperate) {
        this.url = url;
        this.timeout = timeout;
        this.operate = operate;
        this.isConnect = false;
        this.connection();
    }

    connection = () => {
        if ('WebSocket' in window) {
            this.socket = new WebSocket(this.url);
            this.socket.onopen = this.onopen;
            this.socket.onmessage = this.onmessage;
            this.socket.onclose = this.onclose;
            this.socket.onerror = this.onerror;
        } else {
            console.warn('设备不支持-Websocket');
            /**
             * 备选方案
             */
        }
    };

    onopen() {
        this.isConnect = true;
        if (this.operate) {
            const {socketOpen} = this.operate;
            socketOpen && socketOpen();
        }
    }

    onmessage(msg: MessageEvent) {
        if (this.operate) {
            const {socketReceive} = this.operate;
            socketReceive && socketReceive(msg);
        }
    }

    onclose(e: CloseEvent) {
        this.isConnect = false;
        if (this.operate) {
            const {socketClose} = this.operate;
            socketClose && socketClose(e);
        }
        /**
         * 根据后台的反馈判断 是否重连
         */
    }

    onerror(e: Event) {
        if (this.operate) {
            const {socketError} = this.operate;
            this.socket = undefined;
            socketError && socketError(e);
        }
    }

    sendMsg(data: string | ArrayBuffer | SharedArrayBuffer | Blob | ArrayBufferView) {
        if(this.isConnect && this.socket){
            this.socket.send(data);
        }
    }


}