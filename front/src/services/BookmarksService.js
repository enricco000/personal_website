import Api from '@/services/Api'

export default {
  index (bookmark) {
    return Api().get('bookmarks', {
      params: bookmark
    })
  },
  post (bookmark) {
    return Api().post('bookmarks', {
      params: bookmark
    })
  },
  delete (bookmark) {
    return Api().delete('bookmarks/delete', {
      params: bookmark
    })
  },
  indexer (UserId) {
    return Api().get('bookmarks/indexer', {
      params: UserId
    })
  }
}
