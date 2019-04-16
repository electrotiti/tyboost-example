const NodeCache = require('node-cache')

module.exports = class Database {
  constructor (ttl) {
    this.myCache = new NodeCache({stdTTL: ttl});
  }

  keys () {
    return new Promise((resolve, reject) => {
      this.myCache.keys((err, keys) => {
        if (err) {
          reject(err)
        } else {
          resolve(keys)
        }
      })
    })
  }

  set (key, value) {
    return new Promise((resolve, reject) => {
      this.myCache.set(key, value, (err, success) => {
        if (!err && success) {
          resolve(true)
        } else {
          reject(err || 'Unknown error')
        }
      })
    })
  }

  get (key) {
    return new Promise((resolve, reject) => {
      this.myCache.get(key, (err, value) => {
        if (!err) {
          if (value === undefined) {
            reject('Key not found')
          } else {
            resolve(value)
          }
        } else {
          reject(err)
        }
      })
    })
  }

  mget (keys) {
    return new Promise((resolve, reject) => {
      this.myCache.mget(keys, (err, value) => {
        if (!err) {
          resolve(value)
        } else {
          reject(err)
        }
      })
    })
  }

  del (key) {
    return new Promise((resolve, reject) => {
      this.myCache.del(key, (err, count) => {
        if (!err) {
            resolve(count)
        } else {
          reject(err)
        }
      })
    })
  }
}
