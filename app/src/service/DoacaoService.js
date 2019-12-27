import axios from 'axios'
var config = require('../../config/index')
let base = config.url
const doacao = base + `/donation/make/`
const historicoDoacao = base + `/donation/list/`
class DoacaoService {
  static doar (valor) {
    let token = localStorage.getItem('token')
    let doacaourl = doacao + token
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(doacaourl, { valor })
        const data = res.data
        resolve(
          data
        )
      } catch (err) {
        reject(err)
      }
    })
  }

  static historicoDoacao () {
    let token = localStorage.getItem('token')
    let doacaourl = historicoDoacao + token
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(doacaourl)
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

export default DoacaoService
