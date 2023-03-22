import React from 'react';
import loadable from '@loadable/component'

const AsyncComponent = loadable((props: any) => import(`../modules/${props.path}`), {})
const Loadable = (path: any) => () => {
    console.log(path)
    console.log(Loadable)
    return (
       
        <AsyncComponent path={path}/>
    )
}





export default Loadable