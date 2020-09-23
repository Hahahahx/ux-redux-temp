/**
 * @File: index
 * @Author: Ux
 * @Date: 2020/9/23
 * @Description:
 */
import {modules} from '@/config/storeConfig';
import {useSelector} from 'react-redux';
import {combineReducers, createStore, ReducersMapObject} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';


interface Action<T = any> {
    type: T,
    payload: any
}

/**
 * 自定义通用reducer，以module区分，每次更新module
 */
const reducers = () => {
    // reducer类型
    const obj: ReducersMapObject<{ [p: string]: any }, any> = {};
    // 遍历modules，生成对应的reducer
    Reflect.ownKeys(modules).forEach(key => {
        const module = Reflect.get(modules,key);
        const moduleItem = () => ({...module});
        type moduleType = ReturnType<typeof moduleItem>
        obj[module.name] = function (state: moduleType = {...module}, action: Action) {
            if (new RegExp(('^' + module.name + '_')).test(action.type)) {
                return {...state, ...action.payload};
            }
            return state;
        };
    });
    return obj;
};

const reducer = combineReducers(reducers());
export const store = createStore(reducer, composeWithDevTools());

//————————————————————————————————————————————————————————————

/**
 * 控制同步更新Module状态
 * @param target 所属Module
 * @param property 方法名为update
 * @param descriptor 方法对象
 */
export function Action(target: any, property: string, descriptor: any) {
    // 限定方法名为update
    if (property !== 'update') return;
    // 保留update原生函数
    const oldFunc = descriptor.value;
    descriptor.value = function () {
        try {
            const value = oldFunc();
            // 同步dispatch
            store.dispatch({
                type: target.name + '_SET',
                payload: {...target}
            });
            return value;
        } catch (e) {
            throw Error(e);
        }
    };
    // 冻结对象
    descriptor.configurable = false;
    descriptor.writable = false;
}




// 获取modules 推断其类型
const stores = () => modules;
type TStore = ReturnType<typeof stores>;

/**
 * module Hook
 * 使用react-redux的useSelector重新组装每个Module对象
 */
export const useModule = (): TStore => {
    const {state} = useSelector(state => ({state}));
    const obj = {};
    // 重新组装module
    Reflect.ownKeys(modules).forEach(key => {
        const module = Reflect.get(modules, key);
        const moduleState = Reflect.get(state, key);
        Reflect.set(obj, key, Object.assign(module, moduleState));
    });
    // 对Module进行类型断言
    return obj as TStore;
};
