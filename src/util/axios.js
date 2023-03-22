/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-13 23:34:03
 */
import axios from "axios";
import { getStorage } from "./index";
import { useNetwork } from "./useNetwork";
import { message, Alert, Button, notification, Modal, Space } from "antd";

axios.defaults.timeout = 30000;
// axios.defaults.baseURL = "http://116.62.13.6:8085/";
// http://172.20.2.43/lost/#/
// axios.defaults.baseURL = "https://we.cqupt.edu.cn/lostFound/api/";

axios.defaults.baseURL = "https://we.cqupt.edu.cn/api";
// https://we.cqupt.edu.cn/api
// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // config.data = JSON.stringify(config.data);
    const token = getStorage("token");
    // config.data = qs.stringify(config.data)
    if (token) {
      if (config.url == "http://172.20.2.43/lost/#/lost/add") {
        // if(config.url === 'http://116.62.13.6:8085/lost/add'){
        config.headers = {
          "Content-Type": "application/x-www-form-urlencoded",
          token: token,
        };
      } else {
        config.headers = {
          "Content-Type": "application/json",
          token: token,
        };
      }
    }
    // else{
    //   Info()
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res) => {
    // 对响应数据做些什么
    return res;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export function get(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function del(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function post(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
//封装put请求
export function put(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, data)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function patch(url, data) {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data)
      .then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          reject(res);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
