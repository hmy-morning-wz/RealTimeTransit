export default class store {
  constructor (opts) {
    this.opts = opts
  }

  get (key) {
    return sessionStorage.getItem(key) ? JSON.parse(sessionStorage.getItem(key)) : {}
  }

  set (key, value) {
    sessionStorage.setItem(key, value)
    return true
  }

  remove (key) {
    sessionStorage.removeItem(key)
    return true
  }

  getStore (key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : {}
  }

  setStore (key, value) {
    localStorage.setItem(key, value)
    return true
  }

  removeStore (key) {
    localStorage.removeItem(key)
    return true
  }
}
