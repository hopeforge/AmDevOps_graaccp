import axios from 'axios'
var config = require('../../config/index')
let base = config.url
const userCadastra = base + `/api/register`
const userEdit = base + `/api/changepwd`
const getUser = base + `/api/mydata/`
const getXp = base + `/level/check/`
class UserService {
  static saveUser (email, password, name) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(userCadastra, {
          email,
          password,
          name
        })
        const data = res.data
        resolve(
          data
        )
      } catch (err) {
        reject(err)
      }
    })
  }
  static getDados () {
    return new Promise(async (resolve, reject) => {
      try {
        let token = localStorage.getItem('token')
        let getUserUrl = getUser + token
        const res = await axios.get(getUserUrl)
        const data = res.data
        resolve(
          data
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  static editUser (email, password, passwordOld) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(userEdit, {
          email,
          password,
          passwordOld
        })
        const data = res.data
        resolve(
          data
        )
      } catch (err) {
        reject(err)
      }
    })
  }
  static getXp () {
    return new Promise(async (resolve, reject) => {
      try {
        let token = localStorage.getItem('token')
        let urlxp = getXp + token
        const res = await axios.get(urlxp)
        const data = res.data.data
        let xp = data.exp
        let t = data.level * 300
        xp = xp * 100
        t = xp / t
        let datas = { xp: t, level: data.level }
        resolve(
          datas
        )
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default UserService
