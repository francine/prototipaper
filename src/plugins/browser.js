import Requester from './paper/Requester.js'
import Record from './paper/Record.js'
import DataType from './paper/DataType.js'
import Page from './paper/Page.js'

export default ({ app, router, store, Vue }) => {
  var requester = new Requester()
  var record = new Record(store)
  var dataType = new DataType(Vue.options.filters)
  var page = new Page(store, router)
  var browser = {
    requester: requester,
    record: record,
    dataType: dataType,
    page: page
  }
  Vue.prototype.$browser = browser
}
