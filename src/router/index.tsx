/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2020-12-26 14:47:37
 */
import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Loadable from './loadable';

export const renderRender = (config: any) =>{
    return Object.entries(config).map((item: any) => {
        const props: any ={
            exact: true,
            path: item[0]
        }
        if (item[1] instanceof Object) {
            if (item[1].exact === false) {
                props.exact = false;
            }
            if (item[1].component) {
                props.component = Loadable(item[1].component);
            }
        } else {
            props.component = Loadable(item[1])
        }
        console.log(props);
        
        return <Route {...props} key={ props.path }/>
    })
}

export * from './config'