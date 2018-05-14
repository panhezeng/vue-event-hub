<template>
  <div id="app">
    <h1>VueEventHub example</h1>
    <p>
      请打开浏览器控制台，看输出日志， {{user.join(' ====> ')}}
    </p>

  </div>
</template>

<script>
  const Event = {
    AppSetUser: 'AppSetUser',
  }
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
      this.$eventHub.on(Event.AppSetUser, this.setUser)
      this.$eventHub.emit(Event.AppSetUser, {name: 'phz1'})
      setTimeout(() => {
        this.$eventHub.delData('user')
        // 这个事件已经监听不到了，因为setUser后off了
        this.$eventHub.emit(Event.AppSetUser, {name: 'phz2'})
      }, 600)

    },
    methods: {
      setUser (data) {
        this.$eventHub.setData('user', data, true)
        this.$eventHub.off(Event.AppSetUser, this.setUser)
      },
    },
  }
</script>

