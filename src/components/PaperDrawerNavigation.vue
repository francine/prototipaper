<template lang="pug">
  q-layout-drawer(
    side="right"
    v-model="drawer"
    :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
  )
    q-list(v-if="showLinks")
      q-list-header
        | NAVEGAÇÃO
      q-item(
        v-for="link in links"
        :key="link.href"
        link
        @click.native="openUrl(link.href)"
      )
        q-item-main(
          :label="link.title"
        )

    q-list(v-if="showActions")
      q-list-header
        | AÇÕES
      q-item(
        v-for="action in actions"
        :key="action.href"
        link
        @click.native="openForm(action.href)"
      )
        q-item-main(
          :label="action.title"
        )

    paper-modal-actions(ref="paperModalActions")
</template>

<script>
import PaperModalActions from './PaperModalActions.vue'
export default {
  data: () => ({
    drawer: true
  }),

  components: {
    PaperModalActions
  },

  computed: {
    links () {
      var links = this.$paper.browser.links
      return links
    },

    actions () {
      var actions = this.$paper.browser.actions
      return actions
    },

    showLinks () {
      var hasLinks = this.$paper.browser.hasLinks()
      return hasLinks
    },

    showActions () {
      var hasActions = this.$paper.browser.hasActions()
      return hasActions
    }
  },

  methods: {
    openUrl (link) {
      this.$paper.browser.openUrl(link)
    },

    openForm (link) {
      this.$refs.paperModalActions.opened = true
    }
  }
}
</script>
