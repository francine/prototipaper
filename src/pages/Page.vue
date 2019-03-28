<template lang="pug">
  component(:is='dynamicComponent')
</template>

<script>
import PaperGrid from './Grid.vue'
import PaperView from './View.vue'
export default {
  components: {
    PaperGrid,
    PaperView
  },

  props: {
    demonstrationMode: {
      type: Boolean,
      default: false
    }
  },

  created () {
    this.$browser.page.load(this.demonstrationMode)
  },

  computed: {
    dynamicComponent () {
      switch (this.$browser.page.type) {
        case this.$browser.page.pageTypeEnum.GRID:
          return PaperGrid
        default:
          return PaperView
      }
    }
  }
}
</script>
