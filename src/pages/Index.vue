<template lang="pug">
  q-page(class="flex flex-center")
    q-list(highlight)
      q-list-header
        | {{ title }}
      q-item(
        v-for="item in items"
        :key="item.name"
      )
        q-item-main(:label="item.title")
        q-item-side(right)
          q-item-tile(
            icon="chat_bubble"
            color="green"
          )
</template>

<style>
</style>

<script>
export default {
  data: () => ({
    viewShow: ''
  }),

  created () {
    var url = '/statics/demo/record.json'
    this.$browser.load(url)
  },

  computed: {
    items () {
      return this.$browser.record.records
    },

    title () {
      return this.$browser.title
    }
  }
}
</script>
