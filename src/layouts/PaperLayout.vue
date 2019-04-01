<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(color="primary")
        q-toolbar-title
          | Prototipaper

        q-btn(
          flat
          round
          dense
          v-if="showNavigation"
          @click="openDrawerNavigation()"
          icon="menu"
        )

    paper-drawer-navigation(
      ref="paperDrawerNavigation"
    )

    q-page-container
      router-view
</template>

<script>
import PaperDrawerNavigation from '../components/PaperDrawerNavigation'
export default {
  components: {
    PaperDrawerNavigation
  },

  computed: {
    showNavigation () {
      var hasLinks = this.$paper.browser.hasLinks()
      var hasActions = this.$paper.browser.hasActions()
      return hasLinks || hasActions
    }
  },

  methods: {
    openDrawerNavigation () {
      this.$refs.paperDrawerNavigation.drawer = !this.$refs.paperDrawerNavigation.drawer
    }
  }
}
</script>

<style>
</style>
