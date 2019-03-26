export default class Record {
  constructor (store) {
    this.store = store
  }

  get properties () {
    return this.self.properties
  }

  get self () {
    var entity = this.store.state.paper.entity
    if (entity) {
      return entity
    }
    return ''
  }

  get records () {
    var entities = this.store.state.paper.entities
    if (entities) {
      return entities
    }
    return []
  }

  get propertiesHeaders () {
    if (this.self && this.self.properties) {
      return this.self.properties.__headers.record
    }
    return []
  }

  get headers () {
    var headers = this.store.getters['paper/getHeaders']
    return headers
  }
}
