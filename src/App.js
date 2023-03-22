/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2020-12-26 13:59:23
 */
import React from 'react';
import './App.css';

import { Provider } from 'react-redux';
// import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes, HashRouter as Router, Route } from 'react-router-dom'
import store from './models/index.tsx'
import loadable from '@loadable/component'
// 异步加载
const Login = loadable(() => import('./modules/login'))
const Index = loadable(() => import('./modules/index'))
const register = loadable(() => import('./modules/register'))
const Wait = loadable(() => import('./modules/wait'))




function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* {renderRender(mainRouters)} */}
          <Route path="/" element={<Index />} />
          <Route path='lost'>
            <Route path="index/*" index element={<Index />} />
            <Route path="wait" element={<Wait />} />
          {/* <Route path="/register" component={register} />
          <Route path="/wait" component={Wait} />
          <Route path="/" exact component={Index} /> */}
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
