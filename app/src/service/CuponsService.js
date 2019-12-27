import axios from 'axios'
var config = require('../../config/index')
let base = config.url
const cupons = base + `/cupons/my/`
const Ativecupons = base + '/cupons/acive/'
class cuponsService {
  static getcupons () {
    let token = localStorage.getItem('token')
    let cuponsurl = cupons + token
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(cuponsurl, { auth: { username: 'USERNAME',
          password: 'PASSWORD' } })
        const data = res.data
        resolve(
          data
        )
      } catch (err) {
        reject(err)
      }
    })
  }
  static ativeCupons (cuponId) {
    let token = localStorage.getItem('token')
    let Ativecuponsurl = Ativecupons + token
    return new Promise(async (resolve, reject) => {
      try {
        const client = axios.create({
          auth: {
            username: 'yourmail', // This could be your email
            password: 'renenne'
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const res = await client.post(Ativecuponsurl, {
          cuponId: cuponId
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
}

export default cuponsService
