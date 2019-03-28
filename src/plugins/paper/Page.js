import PageTypeEnum from './PageType.js'
import Requester from './Requester.js'
import { Notify } from 'quasar'

export default class Page {
  constructor (store, router) {
    this.store = store
    this.router = router
    this.pageTypeEnum = PageTypeEnum
    this.requester = new Requester()
  }

  get title () {
    var entity = this.store.state.paper.entity
    if (entity && entity.title) {
      return this.self.title
    }
    return 'Paper'
  }

  get type () {
    var entity = this.store.state.paper.entity
    if (entity) {
      if (entity.hasClass('table')) {
        return PageTypeEnum.GRID
      }
    }
    return PageTypeEnum.VIEW
  }

  load (demonstrationMode) {
    var url = this.router.currentRoute.path
    if (demonstrationMode) {
      var demoRouteName = this.router.currentRoute.params.routeName
      url = `/statics/demo/${demoRouteName}.json`
    }
    this.requester.httpRequest('get', url, this.router.currentRoute.query).then(response => {
      if (response.ok) {
        try {
          this.store.commit('paper/parseSiren', response.data.data)
        } catch (err) {
          console.log('Erro ao converter o siren', err)
          Notify.create({
            message: 'Não foi possível carregar a página solicitada.',
            type: 'negative'
          })
        }
      }
    })
  }
}
