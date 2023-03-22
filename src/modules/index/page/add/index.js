//新增失物界面

import React from 'react'
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { Route, HashRouter as Router, Switch } from "react-router-dom"
import Top from './top'
import Addone from './addone'
import Addmuch from './addmuch'
import AddPictures from './addPictures'

const Add = props => {
  return(
    <div>
      <Top props = {props}></Top>
          <Switch>
            <Route path="/index/add" exact component={Addone}/>
            <Route path="/index/add/single" exact component={Addone}/>
            <Route path="/index/add/multiple" component={Addmuch}/>
            <Route path="/index/add/pictures" component={AddPictures} />
          </Switch>
    </div>
  )
}

export default Add
