import { date } from 'quasar'
export default class DataType {
  constructor (filters) {
    this.BIT = 'bit'
    this.BOOLEAN = 'boolean'
    this.BOOL = 'bool'
    this.NUMBER = 'numbr'
    this.INT = 'int'
    this.LONG = 'long'
    this.DECIMAL = 'decimal'
    this.DOUBLE = 'double'
    this.FLOAT = 'float'
    this.CURRENCY = 'currency'
    this.STRING = 'string'
    this.DATETIME = 'datetime'

    this.filters = filters
  }

  format (value, dataType) {
    switch (dataType) {
      case this.BOOL:
        value = value === 1 ? '\u2714'.normalize() : '\u2717'.normalize()
        break
      case this.DECIMAL:
        value = this.filters.currency(value, 'R$ ', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
        break
      case this.DATETIME:
        value = date.formatDate(value, 'DD/MM/YYYY - HH:mm:ss')
        break
    }
    return value
  }
}
