import Api from '@/services/Api'

export default {
  index (search, page) {
    return Api().get('/entries', {
      params: {
        search: search,
        page: page
      }
    })
  },
  topicIndex (page, topic) {
    return Api().get('/entries/topic', {
      params: {
        topic: topic,
        page: page
      }
    })
  },
  count (search) {
    return Api().get('/entries/count', {
      params: {
        search: search
      }
    })
  },
  topicCount (topic) {
    return Api().get('/entries/count/topic', {
      params: {
        topic: topic
      }
    })
  },
  post (entry) {
    return Api().post('/entries', entry)
  },
  show (entryId) {
    return Api().get(`/entries/${entryId}`)
  },
  put (entry) {
    return Api().put(`/entries/${entry.id}`, entry)
  },
  delete (entryId) {
    return Api().delete('entries/delete', {
      params: entryId
    })
  }
}
