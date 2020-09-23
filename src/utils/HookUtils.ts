/**
 * @File: HookUtils
 * @Author: Ux
 * @Date: 2020/8/5
 * @Description: hook工具事件提供
 *
 * 注意：
 * 保证只在组件最顶层中使用hook，不要再循环，条件，嵌套函数中调用hook。
 * 你需要：
 *  在react函数组件中使用。
 */
import { useEffect, useState } from 'react';

export function useMousePosition(listen = true, offset: { x: number, y: number } = { x: 0, y: 0 }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    useEffect(() => {
        if (listen) {
            const handle = (ev: any) => {
                setPos({ x: ev.clientX - offset.x, y: ev.clientY - offset.y });
            };
            window.addEventListener('mousemove', handle);
            return () => {
                window.removeEventListener('mousemove', handle);
            };
        }
    }, [listen, offset]);

    return pos;
}

export function useDocumentEvent(eventName: string, handler: Function) {
    useEffect(() => {
        const listener = (event: any) => {
            handler(event)
        }
        document.addEventListener(eventName, listener);
        return () => {
            document.removeEventListener(eventName, listener);
        };
    }, [eventName, handler])
}