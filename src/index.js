/**
 * 因为VueEventHub是全项目共用vue实例，所以覆写了on off实例方法，对事件操作进行了检查校验，并提供了相应的提示
 * 因为hot热更新也会触发这个插件实例方法的错误警告提示，为了不影响hot更新调试，使用console.warn，而没有使用throw
 */
import extendEventHub from './common'

let Vue

function install (_Vue) {

  if (Vue) {
    console.warn('[VueEventHub] already installed. Vue.use(VueEventHub) should be called only once.')
    return
  }

  Vue = _Vue

  const eventHub = new Vue({
    data: {
      events: {}
    }
  })

  extendEventHub(eventHub)

  // Vue添加实例属性
  Object.defineProperty(Vue.prototype, '$eventHub', {
    get: function () {
      return eventHub
    }
  })
  // Vue添加全局属性
  Vue.eventHub = eventHub
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export const VueEventHub = {
  install: install
}
