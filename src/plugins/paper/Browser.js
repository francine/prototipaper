import PageTypeEnum from './PageType.js'
import Requester from './Requester.js'
import { Notify, openURL } from 'quasar'

export default class Browser {
  constructor (store, router) {
    this.store = store
    this.router = router
    this.pageTypeEnum = PageTypeEnum
    this.requester = new Requester(router)
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

  get links () {
    if (this.hasLinks()) {
      var entity = this.store.state.paper.entity
      var links = entity.getLinksByRel('link')
      return links
    }
  }

  get selfLink () {
    if (this.hasSelfLink()) {
      var entity = this.store.state.paper.entity
      var links = entity.getLinkByRel('self')
      return links
    }
  }

  get filters () {
    if (this.hasSelfLink()) {
      var entity = this.store.state.paper.entity
      var filters = entity.getActionByName('__filters')
      return filters
    }
  }

  get actions () {
    var entity = this.store.state.paper.entity
    if (entity && entity.actions) {
      var actions = entity.actions.filter(action => action.name !== '__filter')
      return actions
    }
  }

  hasActions () {
    var hasActions = this.actions && this.actions.length > 0
    return hasActions
  }

  hasLinks () {
    var entity = this.store.state.paper.entity
    if (entity) {
      return entity.hasLinkByRel('link')
    }
  }

  hasSelfLink () {
    var entity = this.store.state.paper.entity
    if (entity) {
      return entity.hasLinkByRel('self')
    }
  }

  hasFilters () {
    var entity = this.store.state.paper.entity
    if (entity) {
      return entity.hasActionByName('__filters')
    }
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

  openUrl (url) {
    if (url) {
      var isExternal = this.isExternalUrl(url)
      if (isExternal) {
        openURL(url)
        return
      }
      var isAbsolute = this.isAbsoluteUrl(url)
      if (isAbsolute) {
        window.location = url
        return
      }
      this.router.push(url)
    }
  }

  isAbsoluteUrl (url) {
    var isAbsoluteUrl = require('is-absolute-url')
    return isAbsoluteUrl(url)
  }

  isExternalUrl (url) {
    var isUrlExternal = require('is-url-external')
    return isUrlExternal(url)
  }
}
