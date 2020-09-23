import React from 'react'
import { RouterContext, Routers } from "./Routers"
import { Route } from 'react-router-dom'
import { LazyComponent } from './LazyComponent'
import { InterceptRouteParams } from '.'

/**
 * 路由拦截器，对每个匹配的路由进行拦截（可以在这里做鉴权）
 * intercept是一个函数，函数返回值决定了是否拦截
 * 返回值如果为JSX.Element，即进行拦截并且返回该JSX
 * 返回值如果为Void，即通过拦截
 */
export const InteraptorRoute = ({ intercept, route }: InterceptRouteParams) => {
    console.log(route.child, route.path)
    return (intercept && intercept(route)) || (route.child.length ?
        <RouterContext.Provider value={<Routers routers={route.child} />}>
            <Route exact={!!route.exact} path={route.path} render={() =>
                route.component ? <route.component /> :
                    <LazyComponent componentPath={route.componentPath} />
            }></Route>
        </RouterContext.Provider>
        :
        <Route exact={!!route.exact} path={route.path} render={() =>
            route.noLazy ?
                <route.component /> :
                <LazyComponent componentPath={route.componentPath} />
        }></Route>)
}
