# vue-event-hub

[示例](https://panhezeng.github.io/vue-event-hub/)

## use

`npm i @panhezeng/vue-event-hub -S`


### 默认不带数据管理功能的纯事件hub，可以搭配vuex使用
```javascript
import VueEventHub from '@panhezeng/vue-event-hub'

Vue.use(VueEventHub)

console.log(Vue.eventHub)
```

### 带数据管理功能的事件hub, 类似个极简的vuex
```javascript
import VueEventHub from '@panhezeng/vue-event-hub/dist/vue-event-hub-store.min.js'
```

### 事件名和数据属性名，建议单独写一个静态类，这样管理使用方便，比如下面例子中的AppSetUser和user
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
    
    
    因为VueEventHub是全项目共用vue实例，所以覆写了on off实例方法，并提供了setData getData delData实例方法，这些方法对事件和数据操作进行了检查校验，并提供了相应的提示
    因为hot热更新也会触发这个插件实例方法的错误警告提示，为了不影响hot更新调试，使用console.warn，而没有使用throw
    本组件没有太复杂的东西，放心使用，如果觉得不好的地方，可以fork自行修改，非常简单
    

## 编译

``` bash
# install dependencies
npm install

# 运行插件使用示例
npm run dev:example

# 编译插件
npm run build
```

