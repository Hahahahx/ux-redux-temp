/**
 * @File: ButtonUtils
 * @Author: Ux
 * @Date: 2020/8/1
 * @Description: 防抖与节流
 */

// 防抖
export const beBounce = (fn: Function, delay?: number) => {
    delay = delay || 200;
    let timer: any;
    return (...args: any) => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};


// 节流
export const throttle = (fn: Function, delay?: number) => {
    delay = delay || 200;
    let timer: any;
    return (...args: any) => {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                fn(...args);
            }, delay);
        }
    };
};

