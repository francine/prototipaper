import Requester from './paper/Requester.js'
import Record from './paper/Record.js'

export default ({ app, router, store, Vue }) => {
  var requester = new Requester()
  var record = new Record(store)
  var browser = {
    requester: requester,
    record: record,

    get title () {
      var entity = store.state.paper.entity
      if (entity && entity.title) {
        return entity.title
      }
      return ''
    },

    load (url) {
      requester.httpRequest('get', url, {}).then(response => {
        if (response.ok) {
          store.commit('paper/parseSiren', response.data.data)
        } else {
          console.log('erro', response)
        }
      })
    }
  }
  Vue.prototype.$browser = browser
}
