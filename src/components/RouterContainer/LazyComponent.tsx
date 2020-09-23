import React, { FC } from "react";
import loadable from '@loadable/component';

/**
 * 懒加载组件
 * @param componentPath
 * @constructor
 */
export const LazyComponent: FC<{ componentPath: string }> = ({ componentPath }) => {
    const Async = loadable(() => import(`@/${componentPath}`))
    return <Async />
};