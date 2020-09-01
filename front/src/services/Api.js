import axios from 'axios'
import store from '@/store/index'
import config from '@/config'

export default () => {
  return axios.create({
    baseURL: config.apiURL,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
