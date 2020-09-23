import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkToParams } from '.';


export const LinkTo: FC<LinkToParams> = ({ to, intercept, children, style, className, onClick, onRequest }) => {

    const history = useHistory();

    const isThisPage = (path: string) => {
        const location = window.location;
        const { hash } = location;
        // const { pathname } = location;
        // console.log(path,location)
        return '#' + path === hash;
    }


    const clickLink = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        onClick && onClick(e)
        e.preventDefault();
        const location = window.location;
        const isThis = isThisPage(to);
        const go = intercept && await intercept({ to, location, isThis })
        if (!isThis) {
            onRequest && onRequest(e)
            !go && history.push(to)
        }
    }

    return <a href={to} onClick={clickLink} style={style} className={className} >{children}</a>
}