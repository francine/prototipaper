<template lang="pug">
  q-page(class="flex flex-center")
    q-list(highlight)
      q-list-header
        | {{ title }}
      q-item(
        v-for="item in items"
        :key="item"
      )
        q-item-main
          q-item-tile(label)
            q-paper-label(
              :name="item"
              isKey
            )
          q-item-tile(sublabel)
            q-paper-label(:name="item")
</template>

<style>
</style>

<script>
import QPaperLabel from '../components/paper/QPaperLabel.vue'
export default {
  data: () => ({
    viewShow: '',
    amount: 12345
  }),

  components: {
    QPaperLabel
  },

  created () {
    var url = '/statics/demo/record.json'
    this.$browser.load(url)
  },

  computed: {
    title () {
      return this.$browser.title
    },

    items () {
      var properties = this.$browser.record.propertiesHeaders
      return properties
    }
  }
}
</script>
