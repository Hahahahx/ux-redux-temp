import React, { FC } from 'react';
import { LinkTo } from './LinkTo';
import loadable from '@loadable/component';
import { PatchLinkParams } from '.';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * 预加载代码块
 */
export const PatchLink: FC<PatchLinkParams> = ({ to, componentPath, style, className, children,onClick }) => {
    return (
        <LinkTo to={to} style={style} className={className} onClick={onClick}
            intercept={({isThis}) => {
                if (!isThis) {
                    NProgress.start()
                    return new Promise((resolve, reject) => {
                        loadable(() => import(`@/${componentPath}`).then(res => {
                            resolve(false);
                            NProgress.done()
                            return res;
                        }, rej => {
                            NProgress.done()
                            reject(true);
                        })).preload()
                    })
                } else {
                    return true;
                }
            }}>{children}</LinkTo>
    )
}