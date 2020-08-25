import Api from '@/services/Api'

export default {
  index (search) {
    return Api().get('/entries', {
      params: {
        search: search
      }
    })
  },
  post (entry) {
    return Api().post('/entries', entry)
  },
  show (postId) {
    return Api().get(`/entries/${postId}`)
  },
  put (entry) {
    return Api().put(`/entries/${entry.id}`, entry)
  }
}
