export function getPropertyExampls (state, getters, propertyName) {
  var headers = getHeaders(state)
  var property = headers.find(header => header.properties.name === propertyName)
  return property
}

export const getHeader = (state) => (headerName) => {
  var headers = getHeaders(state)
  var header = headers.find(header => header.properties.name === headerName)
  return header
}

export const getHeaders = (state) => {
  var entities = state.entities
  var headers = entities.filter(entity => entity.class.includes('header'))
  return headers
}
