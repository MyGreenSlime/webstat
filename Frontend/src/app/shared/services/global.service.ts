import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }
  
  showLoading(isShow) {
    let className = "page-loading";
    if (isShow) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }

  getLocalStorage(key) {
    var value = null;
    if (localStorage) {
      value = localStorage.getItem(key);
      if (value && this.checkValidJSONString(value)) {
        value = JSON.parse(value);
      }
    }
    return value;
  }

  setLocalStorage(key, value) {
    if (localStorage) {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      localStorage.setItem(key, value);
    }
  }

  removeLocalStorage(key) {
    if (localStorage) {
      localStorage.removeItem(key);
    }
  }
  
  checkValidJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
