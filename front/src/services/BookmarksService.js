import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  post (bookmark) {
    return Api().post('bookmarks/create', {
      params: bookmark
    })
  },
  delete (bookmark) {
    return Api().delete('bookmarks/delete', {
      params: bookmark
    })
  },
  indexer () {
    return Api().get('bookmarks/indexer', {
    })
  }
}
