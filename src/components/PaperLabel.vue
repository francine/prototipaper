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
    },
    truncate: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    label () {
      var item = this.$paper.record.headers.getHeader(this.name)
      if (this.isKey) {
        return item.title
      }
      if (this.truncate && this.$paper.dataType.isString(item)) {
        var truncate = this.$paper.utils.truncate(this.value, 30)
        return truncate
      }
      var property = this.$paper.dataType.format(this.value, item.properties.dataType)
      return property
    }
  }
}
</script>
