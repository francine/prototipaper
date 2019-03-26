<template lang="pug">
  label {{ value }}
</template>

<script charset="utf-8">
import { date } from 'quasar'
export default {
  props: {
    name: String,
    isKey: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    value () {
      var headers = this.$browser.record.headers
      var item = headers.find(header => header.properties.name === this.name)
      if (this.isKey) {
        return item.title
      }
      var value = this.$browser.record.properties[this.name]
      return this.translateValueType(value, item.properties.dataType)
    }
  },

  methods: {
    translateValueType (value, dataType) {
      switch (dataType) {
        case this.$browser.dataType.BOOL:
          value = value === 1 ? '\u2714'.normalize() : '\u2717'.normalize()
          break
        case this.$browser.dataType.DECIMAL:
          value = this.$filters.currency(value, 'R$ ', 2, { thousandsSeparator: '.', decimalSeparator: ',' })
          break
        case this.$browser.dataType.DATETIME:
          value = date.formatDate(value, 'DD/MM/YYYY - HH:mm:ss')
          break
      }
      return value
    }
  }
}
</script>
