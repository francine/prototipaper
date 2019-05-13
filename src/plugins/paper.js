import Record from './paper/Record.js'
import DataType from './paper/DataType.js'
import Browser from './paper/Browser.js'
import Utils from './paper/Utils.js'
import Form from './paper/Form.js'

export default ({ app, router, store, Vue }) => {
  var record = new Record(store)
  var dataType = new DataType(Vue.options.filters)
  var browser = new Browser(store, router)
  var utils = new Utils()
  var form = new Form(dataType, router, store)
  var paper = {
    record: record,
    dataType: dataType,
    browser: browser,
    utils: utils,
    form: form,

    get title () {
      var entity = store.state.paper.entity
      if (entity && entity.title) {
        return entity.title
      }
      return 'Paper'
    }
  }
  Vue.prototype.$paper = paper
}
