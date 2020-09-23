import React, { FC } from "react";
import loadable from '@loadable/component';


export const LazyComponent: FC<{ componentPath: string }> = ({ componentPath }) => {
    const Async = loadable(() => import(`@/${componentPath}`))
    return <Async />
};