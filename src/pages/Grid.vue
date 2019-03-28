<template lang="pug">
  q-table(
    :title="title"
    :data="items"
    :columns="columns"
    :config="config"
    row-key="id"
    no-data-label="Não existem dados para exibir."
    no-results-label="Nenhum registro foi encontrado."
    loading-label="Carregando..."
    rows-per-page-label="Itens por página"
    hide-bottom
  )
    q-tr(
      slot="body"
      slot-scope="props"
      :props="props"
    )
      q-td(
        v-for="col in props.cols"
        :key="col.name"
        :props="props"
      )
        q-paper-label(
          :name="col.name"
          :value="props.row[col.name]"
        )
</template>

<style>
</style>

<script>
import QPaperLabel from '../components/paper/QPaperLabel.vue'
export default {
  data: () => ({
    config: {
      rowHeight: '50px',
      title: 'Data Table',
      labels: {
        columns: 'Coluuuuumns',
        allCols: 'Eeeeeeeeevery Cols',
        rows: 'Rooows',
        selected: {
          singular: 'item selected.',
          plural: 'items selected.'
        },
        clear: 'clear',
        search: 'Search',
        all: 'All'
      }
    }
  }),

  computed: {
    items () {
      return this.$browser.record.records.properties
    },

    title () {
      return this.$browser.title
    },

    columns () {
      var columns = []
      var headers = this.$browser.record.records.headers
      if (headers) {
        headers.forEach(header => {
          columns.push({
            name: header.properties.name,
            type: header.properties.dataType,
            label: header.properties.title,
            align: header.properties.align ? header.properties.align : 'left'
          })
        })
      }
      return columns
    }
  },

  components: {
    QPaperLabel
  }
}
</script>
