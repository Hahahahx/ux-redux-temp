import { Decrypt, Encrypt } from "@/utils/js-aes";

const Session = window.sessionStorage;

export const persist = (...a: any) => {
    console.log(a);
    /*
        const obj:{[name:string]:any} = {}
        for(const key in a[0]){
            obj[key] =  a[0][key]
        }
        Session.setItem( a[0].constructor.name,JSON.stringify(obj));
        */
};

/**
 * 初始化数据store
 */
export const setModule = () => {
    return (target: any) => {
        const module = Session.getItem(target.name);
        if (module) {
            for (const key in target.prototype) {
                target.prototype[key] = JSON.parse(Decrypt(module))[key];
            }
        } else {
            const obj: { [name: string]: any } = {};
            for (const key in target.prototype) {
                obj[key] = target.prototype[key];
            }
            Session.setItem(target.name, Encrypt(JSON.stringify(obj)));
        }
    };
};

/**
 * 更新SessionStorage中的数据
 * @param module
 * @param item
 * @param value
 */
export const setItemToSession = (module: string, key: string, value: any) => {
    const store = JSON.parse(Decrypt(Session.getItem(module)));
    store[key] = value
    Session.setItem(module, Encrypt(JSON.stringify(store)));
};