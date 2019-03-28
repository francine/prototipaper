<template lang="pug">
  div(id="q-app")
    router-view(:key="$route.fullPath")
</template>

<script>
export default {
  beforeRouteUpdate (to, from, next) {
    next()
  },
  created () {
    var path = window.location.href
    var hash = `${window.location.origin}/#`
    var startsWithHash = path.startsWith(hash)
    var startsWithIndex = path.toLowerCase().startsWith(window.location.origin + '/index')
    var containsHash = startsWithHash || startsWithIndex
    if (!containsHash) {
      path = path.replace('#/', '')
      path = path.replace(window.location.origin, hash)
      window.location = path
    }
  }
}
</script>

<style>
</style>
