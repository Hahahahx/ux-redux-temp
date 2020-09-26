import { modules } from '@/config/moduleConfig';
import React, { FC } from 'react';
import { Provider, useSelector } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducers } from '.';

const reducer = combineReducers(reducers(modules));
export const store = createStore(reducer, composeWithDevTools());


/**
 * ReduxProvider组件
 */
const ReduxProvider: FC = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};

export default ReduxProvider;




// 获取modules 推断其类型
const stores = () => modules;
type TStore = ReturnType<typeof stores>;

/**
 * module Hook
 * 使用react-redux的useSelector重新组装每个Module对象
 */
export function useModule(): TStore {
    const { state } = useSelector(state => ({ state }));
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
