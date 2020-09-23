import { ReactElement, CSSProperties } from 'react';

export interface RouteParams {
    path: string
    exact?: boolean
    authority?: boolean
    default?: boolean
    noLazy?: boolean
    child: Array<RouteParams>
    componentPath: string
    component?: any
}

export interface RouterParams {
    intercept?: (route: RouteParams) => void | JSX.Element | ReactElement
    routers: Array<RouteParams>
    noMatch?: () => ReactElement | JSX.Element
}

export interface InterceptRouteParams {
    intercept?: (route: RouteParams) => void | JSX.Element | ReactElement
    route: RouteParams
}

export interface LinkToParams extends LinkParams {
    intercept?: (data: LinkInterceptParams) => boolean | Promise<boolean>
}

/**
 * 预加载组件
 */
export interface PatchLinkParams extends LinkParams {
    componentPath: string
}

/**
 * onClick与onRequest均为点击事件
 * onClick无论如何都将生效，onRequest仅在页面发生置换时生效        
 */
interface LinkParams {
    to: string
    style?: CSSProperties
    className?: string
    onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
    onRequest?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

interface LinkInterceptParams {
    to: string
    location: Location
    isThis: boolean
}

