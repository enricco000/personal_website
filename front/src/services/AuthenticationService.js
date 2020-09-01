import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('/register', credentials)
  },
  verify (verificationToken) {
    return Api().put('/verify', verificationToken)
  },
  login (credentials) {
    return Api().post('/login', credentials)
  }
}
