import axios from 'axios'
var config = require('../../config/index')
let base = config.url
const authApi = base + `/api/login`
const verifyTokenApi = base + `/api/login/verifytoken`

class AuthService {
  static authenticate (email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(authApi, {
          password,
          email
        })
        const data = res.data
        if (!data.data) {
          if (data.error == null) {
            resolve('Erro desconhecido')
          } else {
            resolve(data.error)
          }
        } else {
          localStorage.setItem('token', data.data.token)
          localStorage.setItem('username', data.data.userName)
          resolve(false)
        }
      } catch (err) {
        reject(err)
      }
    })
  };

  static verifyToken () {
    return new Promise(async (resolve, reject) => {
      try {
        let userTk = localStorage.getItem('token')
        console.log(userTk)
        if (!userTk) resolve(false)
        const res = axios.post(verifyTokenApi, { userTk })
        const data = res.data
        if (data.auth) return resolve(true)
        resolve(false)
      } catch (err) {
        reject(err)
      }
    })
  }

  static logout () {
    return new Promise(async (resolve, reject) => {
      resolve(localStorage.removeItem('token'))
    })
  }
}

export default AuthService
