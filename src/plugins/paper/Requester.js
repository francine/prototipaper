import axios from 'axios'

export default class Requester {
  constructor (router) {
    this.router = router
  }

  httpRequest (method, href, params) {
    var getParams = method.toLowerCase() === 'get' ? params : ''
    var header = {
      'Accept': 'application/json;application/vnd.siren+json;charset=UTF-8;',
      'Access-Control-Expose-Headers': 'Access-Control-*',
      'Access-Control-Allow-Headers': 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD',
      'Access-Control-Allow-Origin': '*',
      'Allow': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
    }
    return axios.request({
      url: href,
      method: method,
      data: params,
      params: getParams,
      headers: header
    }).then(response => {
      return {
        ok: true,
        data: response
      }
    }).catch(error => {
      if (!error.response) {
        return {
          ok: false,
          data: error.response
        }
      }
      console.log('Erro: ', error.response)
      return {
        ok: false,
        data: error.response
      }
    })
  }
}
