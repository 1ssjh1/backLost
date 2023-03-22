//新增失物界面

import React from 'react'
// import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import Top from './top'
import Addone from './addone'
import Addmuch from './addmuch'
import AddPictures from './addPictures'

const Add = props => {
  return(
    <div>
      {/* hello word */}
      <Top props = {props}></Top>
          <Routes>
            <Route path="/" exact element={<Addone/>} />
            <Route path="/single" exact element={<Addone/>}/>
            <Route path="/multiple" element={<Addmuch/>}/>
            <Route path="/pictures" element={<AddPictures/>} />
          </Routes>
    </div>
  )
}

export default Add
