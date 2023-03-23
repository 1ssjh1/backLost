/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2020-12-26 13:59:23
 */
import React from "react";
import "./App.css";
import axios from "axios";
import { Provider } from "react-redux";
// import { Switch, BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch, HashRouter as Router, Route } from "react-router-dom";
import store from "./models/index.tsx";
import loadable from "@loadable/component";
// 异步加载
const Login = loadable(() => import("./modules/login"));
const Index = loadable(() => import("./modules/index"));
const register = loadable(() => import("./modules/register"));
const Wait = loadable(() => import("./modules/wait"));

function App() {
  const formData = new FormData();
  formData.append("cqupt_id", "1675537");
  formData.append("password", "4$9Y*%TsYvYHG#K4");

  return (
    <div
      onClick={() => {
        axios.post("/api/login", formData, {
          headers: {
            traefik: "user",
          },
        });
      }}
    >
      ddd
    </div>
    // <Provider store={store}>
    //   <Router basename='/lost/' >
    //     <Switch>
    //       {/* {renderRender(mainRouters)} */}

    //       <Route path="/index" component={Index} />
    //       {/* <Route path="/register" component={register} />
    //       <Route path="/wait" component={Wait} />
    //       <Route path="/" exact component={Index} /> */}
    //     </Switch>
    //   </Router>
    // </Provider>
  );
}

export default App;
