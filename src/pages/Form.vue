<template lang="pug">
  div

    q-page(
      padding
      class="justify-center"
    )

      h6 Registros Afetados

      div {{ records }}

      h6 {{ title }}

      div(
        row
        v-for="field in fields"
        :key="field.name"
      )
        component(:is="dynamicComponent(field)" :field="field")

</template>

<script>
import PaperText from '../components/PaperText.vue'
import PaperNumber from '../components/PaperNumber.vue'
import PaperDatetime from '../components/PaperDatetime.vue'
import PaperCheckbox from '../components/PaperCheckbox.vue'
import PaperCurrency from '../components/PaperCurrency.vue'
export default {
  components: {
    PaperText,
    PaperNumber,
    PaperDatetime,
    PaperCheckbox,
    PaperCurrency
  },

  props: {
    demonstrationMode: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    records () {
      var selected = this.$paper.browser.selected
      return selected
    },

    title () {
      var action = this.$paper.browser.action.title
      return action
    },

    fields () {
      var fields = this.$paper.browser.action.fields
      return fields
    },

    placeholder () {
      var placeholder = this.$paper.browser.action.placeholder
      return placeholder
    }
  },

  methods: {
    submit () {
      console.log('submit')
    },

    goBack () {
      this.$router.go(-1)
    },

    dynamicComponent (field) {
      var header = this.$paper.record.headers.getHeader(field.name)
      if (header && header.properties) {
        switch (header.properties.dataType) {
          case 'number':
            return PaperNumber
          case 'datetime':
            return PaperDatetime
          case 'bool':
            return PaperCheckbox
          case 'decimal':
            return PaperCurrency
          default:
            return PaperText
        }
      }
    }
  }
}
</script>
