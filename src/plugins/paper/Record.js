export default class Record {
  constructor (store) {
    this.store = store
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

  get properties () {
    var entities = this.store.state.paper.properties
    if (entities) {
      return entities
    }
    return []
  }
}
