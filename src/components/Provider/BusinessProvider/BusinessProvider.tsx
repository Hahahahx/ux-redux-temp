import { storeContext } from "."
import React, { FC } from "react"
import { useLocalStore } from "mobx-react-lite"
import { businessStore } from '@/config/storeConfig';

//createStore(状态集)
export const createStore = () => businessStore;

// TStore(状态集类型)
export type TStore = ReturnType<typeof createStore>

/**
 * @File: Provider.tsx
 * @Author: Ux
 * @Date: 2020/7/27
 * @Description: 状态集顶层容器，基于mobx
 */
export const BusinessProvider: FC = ({ children }) => {

    const stores = useLocalStore(createStore)
    return (
        <storeContext.Provider value={stores}>
            {children}
        </storeContext.Provider>
    )
}