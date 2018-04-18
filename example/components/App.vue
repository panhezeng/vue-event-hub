<template>
  <div id="app">
    请打开浏览器控制台，看输出日志，VueEventHub {{user.join()}}
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        user: [],
      }
    },
    created () {
      this.$eventHub.watch('user', (newVal, oldVal) => {
        console.log(this.$eventHub.getData('user'), newVal, oldVal)
        this.user.push(newVal ? JSON.stringify(this.$eventHub.getData('user')) : 'undefined')
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

