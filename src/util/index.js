/*
 * @Author: lsh
 * @email: 864115770@qq.com
 * @Date: 2021-02-14 19:03:09
 */

export function setStorage(type, value) { 
  localStorage.setItem(type, value);
}

export function getStorage(type) {
  return localStorage.getItem(type);
}

export const deleteStorage=(type)=>{
  localStorage.removeItem(type);
}

 