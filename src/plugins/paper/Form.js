import PaperText from '../../components/PaperText.vue'
import PaperNumber from '../../components/PaperNumber.vue'
import PaperCheckbox from '../../components/PaperCheckbox.vue'
import PaperHidden from '../../components/PaperHidden.vue'
import PaperDatetime from '../../components/PaperDatetime.vue'
import PaperCurrency from '../../components/PaperCurrency.vue'
import PaperLabel from '../../components/PaperLabel.vue'

import { Notify } from 'quasar'
import Requester from './Requester.js'

export default class Form {
  constructor (dataType, router, store) {
    this.dataType = dataType
    this.store = store
    this.requester = new Requester(router)
    this.filtersActionName = '__filters'
  }

  hasFilters () {
    return this.hasForm(this.filtersActionName)
  }

  hasForm (formName) {
    var entity = this.store.state.paper.entity
    if (entity) {
      return entity.hasActionByName(formName)
    }
    return false
  }

  getFilters () {
    return this.getForm(this.filtersActionName)
  }

  getForm (formName) {
    if (this.hasForm(formName)) {
      var entity = this.store.state.paper.entity
      var form = entity.getActionByName(formName)
      return form
    }
  }

  getProperties (formName) {
    var entity = this.store.state.paper.entity
    if (entity && entity.hasSubEntityByClass(formName)) {
      var filters = entity.getSubEntitiesByClass(formName)
      if (filters) {
        return filters.map(record => record.properties)
      }
    }
    return []
  }

  dynamicComponent (field) {
    switch (field.dataType) {
      case this.dataType.HIDDEN:
        return PaperHidden
      case this.dataType.DATETIME:
      case this.dataType.DATE:
      case this.dataType.TIME:
        return PaperDatetime
      case this.dataType.STRING:
        return PaperLabel
      case this.dataType.DECIMAL:
      case this.dataType.CURRENCY:
        return PaperCurrency
      case this.dataType.NUMBER:
      case this.dataType.INT:
      case this.dataType.LONG:
      case this.dataType.DOUBLE:
      case this.dataType.FLOAT:
        return PaperNumber
      case this.dataType.BIT:
      case this.dataType.BOOL:
      case this.dataType.BOOLEAN:
      case this.dataType.CHECKBOX:
        return PaperCheckbox
      default:
        return PaperText
    }
  }

  submit (action, params) {
    console.log('action', action.method, action.href)
    console.log('params', params)
    this.requester.httpRequest(action.method, action.href, params).then(response => {
      console.log('error', response)
      if (response.ok) {
        var json = response.data.data
        if (json) {
          this.store.commit('paper/parseSiren', json)
          Notify.create({ message: 'Operação realizada com sucesso!', type: 'positive' })
        }
      } else {
        var message = 'Erro ao acessar a url: ' + action.href
        Notify.create({ message: message, type: 'negative' })
      }
    })
  }
}
