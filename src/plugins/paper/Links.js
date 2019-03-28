export default class Links {
  constructor (store) {
    this.store = store
    this.headers = new Headers(this.store)
    this.records = new Records(this.store)
  }

  get self () {
    return this.store.state.paper.entity
  }

  get properties () {
    if (this.self && this.self.properties) {
      return this.self.properties
    }
  }

  getProperty (property) {
    if (this.self) {
      var exists = this.self.hasProperty(property)
      if (exists) {
        return this.properties[property]
      }
    }
  }
}
