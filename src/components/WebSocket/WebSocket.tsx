import React, {FC, useContext} from 'react';
import {Socket, SocketOperate} from '.';

const WebSocketContext = React.createContext<Map<string, Socket> | null>(null);

interface WebsocketProps {
    wsList: Array<string>,
    config?: SocketOperate
}

/**
 * @File: WebSocket.tsx
 * @Author: Ux
 * @Date: 2020/7/27
 * @Description: Websocket组件
 * @param wsList 链接列表
 * @param config 自定义事件
 * @param children
 * @constructor
 */
export const WebSocket: FC<WebsocketProps> = ({wsList, config, children}) => {
    const map = new Map();
    // 根据链接生成每个对象
    wsList.forEach(link => {
        map.set(link, new Socket(link, 5000, config));
    });
    return (
        <WebSocketContext.Provider value={map}>
            {children}
        </WebSocketContext.Provider>
    );
};

/**
 * 自定义hook，使用link来获取对应的socket对象
 */
export const useWebSocket = (link: string) => {
    const context = useContext(WebSocketContext);
    return context && context.get(link);
};