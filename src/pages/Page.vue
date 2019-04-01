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
    this.$paper.browser.load(this.demonstrationMode)
  },

  computed: {
    dynamicComponent () {
      switch (this.$paper.browser.type) {
        case this.$paper.browser.pageTypeEnum.GRID:
          return PaperGrid
        default:
          return PaperView
      }
    }
  }
}
</script>
