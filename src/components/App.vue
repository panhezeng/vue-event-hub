<template>
  <div id="app">
    VueEventHub
  </div>
</template>

<script>
  export default {
    name: 'App',
    created () {
      this.$eventHub.watch('user', (newVal, oldVal) => {
        console.log(this.$eventHub.getData('user'), newVal, oldVal)
      })
      this.$eventHub.on('AppSetUser', this.setUser.bind(this))
      this.$eventHub.emit('AppSetUser', {name: 'phz'})
      setTimeout(() => {
        this.$eventHub.delData('user')
      }, 300)

    },
    methods: {
      setUser (data) {
        this.$eventHub.setData('user', data, true)
      },
    },
  }
</script>

<style>
  #app {
  }
</style>
