# vue-event-hub

## use

```javascript
import VueEventHub from '@panhezeng/vue-event-hub'

Vue.use(VueEventHub)

console.log(Vue.eventHub)
```

```vue
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
```



## VueEventHub实现原理

    其实就是弄一个全局挂载的vue实例，可以全局访问
    覆写的API为以下：
    on
    off
    watch
    
    扩展API
    setData
    getData
    delData

## 编译

``` bash
# install dependencies
npm install

# 运行插件使用示例
npm run dev:example

# 编译插件
npm run build
```

