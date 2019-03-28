<template lang="pug">
  label {{ label }}
</template>

<script charset="utf-8">
export default {
  props: {
    name: String,
    value: [String, Number, Date, Array, Object],
    isKey: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    label () {
      var item = this.$browser.record.headers.getHeader(this.name)
      if (this.isKey) {
        return item.title
      }
      var property = this.$browser.dataType.format(this.value, item.properties.dataType)
      return property
    }
  }
}
</script>
