import React from 'react';
import { useObserver } from 'mobx-react-lite';
import { TStore } from './PageProvieder';

/**
 * @File: index.ts
 * @Author: Ux
 * @Date: 2020/7/27s
 * @Description: createStore(状态集)| TStore(状态集类型)| storeContext（context对象）|
 */
// storeContext（context对象）
export const storeContext = React.createContext<TStore | null>(null);

// 封装mobx 自定义Hook
const useStoreData = <ContextData, Store, Selection>(
    context: React.Context<ContextData>,
    storeSelector: (contextData: ContextData) => Store,
    dataSelector: (store: Store) => Selection
) => {
    const value = React.useContext(context);
    if (!value) {
        throw new Error();
    }
    const store = storeSelector(value);
    return useObserver(() => {
        return dataSelector(store);
    });
};

/**
 * 自定义hook，取store
 * @param dataSelector store=>({user: store.user}) || store=>store.user
 * ____________
 * const {user} = useStore(store=>({user: store.user}))
 * const user = useStore(store=>store.user)
 */
export const usePageStore = <Selection>(
    dataSelector: (store: TStore) => Selection
) =>
    useStoreData(storeContext, contextData => contextData!, dataSelector);
