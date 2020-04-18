import axios from 'axios'
import qs from 'qs'
axios.defaults.timeout = 60000 // timeout in 10 seconds.
// axios.defaults.baseURL = ''
export default {
  send (method, uri, data, headers, record, ken) {
    // data = qs(data)
    return new Promise((resolve, reject) => {
      try {
        axios({
          method: method,
          url:  uri,
          data: data,
          params: data,
          headers :{
            // 'Authorization': '',
            // 'Content-Type': 'multipart/form-data',
          }
        })
          .then(response => {
            if (response.status === 200) {
              resolve(response.data)
            }
            if (ken === 'token') {
              resolve(response)
            }
          })
          .catch((error) => {
            console.error(error)
            reject(new Error('Communication exception, please check the network or retry later.'))
          })
      } catch (e) {
        console.error(`Exception: ${e}`)
        reject(e)
      }
    })
  },
  List (data) {
    return this.send('GET', `http://60.247.62.110:10049/crawlserver/parse/parseUrl?url=${data.url}`)
  },
}
