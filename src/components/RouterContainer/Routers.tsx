import React, {createContext, FC, ReactElement, useContext} from 'react';
import {RouterParams} from '.';
import {Redirect, Route, Switch} from 'react-router-dom';
import {LazyComponent} from './LazyComponent';

export const RouterContext = createContext<ReactElement | null>(null);

/**
 * 路由对象，接收一个拦截处理函数和路由表
 * 子路由会再次调用该对象，嵌套路由。
 */
export const Routers: FC<RouterParams> = ({ intercept, routers, noMatch }) => {

    const defaultRouter = routers.find(item => item.default && item.path)

    // 默认路由配置
    let fromPath: RegExpMatchArray | null | undefined | string
        = defaultRouter && defaultRouter.path.match(/^\/[a-z]+/g)
    // 寻找其父级路由以便重定向映射
    if (fromPath) {
        fromPath.pop();
        fromPath = fromPath.length ? fromPath.join('') : '/';
    }

    return (
        <Switch>
            {routers.map((route: any, index: number) =>
                // 此处返回拦截路由，详见InterceptRoute，由于再次包装以后Switch无法识别Route了，所以不使用InterceptRoute而直接使用其结构。
                (intercept && intercept(route)) || (route.child.length ?
                    <RouterContext.Provider value={<Routers routers={route.child} noMatch={noMatch} />} key={index}>
                        <Route exact={!!route.exact} path={route.path} render={() =>
                            route.component ? <route.component /> :
                                <LazyComponent componentPath={route.componentPath} />
                        }></Route>
                    </RouterContext.Provider>
                    :
                    <Route key={index} exact={!!route.exact} path={route.path} render={() =>
                        route.noLazy ?
                            <route.component /> :
                            <LazyComponent componentPath={route.componentPath} />
                    }></Route>)
            )}
            {defaultRouter && <Redirect exact from={fromPath || '/'} to={defaultRouter.path} />}
            <Route path='/*' render={noMatch} />
        </Switch>
    )
}

/**
 * 对外暴露的子集路由
 */
export const RouterView = () => {
    return useContext(RouterContext)
}
