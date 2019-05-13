<template lang="pug">
  div(
    xs12
    sm12
    md8
    offset-md2
    v-if="hasForm()"
  )
    h6(class="no-margin") {{ form.title }}

    form(:ref="formName")
      div(
        row
        v-for="field in fields"
        :key="field.name"
      )
        component(:is="dynamicComponent(field)" :field="field")

      div(class="btns q-pa-lg")
        q-btn(
          color="secondary"
          @click="submit()"
        ) {{ action.title }}

        q-btn(
          @click="clear()"
        ) Limpar

        q-btn(
          v-if="false"
          @click="goBack()"
          glossy
        ) Cancelar

</template>

<script>
export default {
  data: () => ({
    drawer: true
  }),

  props: ['action'],

  computed: {
    form () {
      var form = this.$paper.form.getForm(this.action.name)
      return form
    },

    fields () {
      var fields = this.$paper.form.getProperties(this.action.name)
      return fields
    },

    formName () {
      var formName = 'form-' + this.form.name
      return formName
    }
  },

  methods: {
    hasForm () {
      var form = this.$paper.form.hasForm(this.action.name)
      return form
    },

    dynamicComponent (field) {
      var component = this.$paper.form.dynamicComponent(field)
      return component
    },

    submit () {
      var params = this.makeParams()
      this.$paper.form.submit(this.action, params)
    },

    makeParams () {
      var params = {}
      var form = this.$refs[this.formName]
      if (this.fields) {
        this.fields.forEach((field) => {
          if (form.elements[field.name] !== undefined) {
            var value = form.elements[field.name].value
            if (value) {
              params[field.name] = value
            }
          }
        })
      }
      return params
    },

    clear () {
      var form = this.$refs[this.formName]
      form.reset()
    },

    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
.btns
  .q-btn
    margin 5px
  .btn-fixed-width
    width 200px
.no-margin
  margin-top: 0px;
  margin-bottom: 0px;
</style>
