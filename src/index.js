/**
 * 因为VueEventHub是全项目共用vue实例，所以覆写了on off实例方法，对事件操作进行了检查校验，并提供了相应的提示
 * 因为hot热更新也会触发这个插件实例方法的错误警告提示，为了不影响hot更新调试，使用console.warn，而没有使用throw
 */


let Vue

function install (_Vue) {

  if (Vue) {
    console.error('[VueEventHub] already installed. Vue.use(VueEventHub) should be called only once.')
    return
  }

  Vue = _Vue

  let eventHub = new Vue({
    data: {
      events: [],
      store: {},
    },
  })

  function on (event, callback) {
    if (eventHub.events.indexOf(String(event)) === -1) {
      eventHub.events.push(String(event))
      eventHub.$on(String(event), callback)
    } else {
      console.warn(event + ':已有同名事件，请换个事件名--$eventHub')
    }
  }

  function off (event, callback, force) {
    if (!event && !force) {
      throw 'event必须传值，必须有事件名--$eventHub'
    }
    if (event) {
      let eventIndex = eventHub.events.indexOf(String(event))
      if (eventIndex === -1) {
        console.warn(event + ':没有监听这个event--$eventHub')
      }
      eventHub.events.splice(eventIndex, 1)
      eventHub.$off(String(event), callback)
    } else {
      eventHub.events = []
      eventHub.$off()
    }
  }

  Object.defineProperties(eventHub, {
    on: {
      get: function () {
        return on
      },
    },
    emit: {
      get: function () {
        return eventHub.$emit
      },
    },
    off: {
      get: function () {
        return off
      },
    },
  })

  // Vue添加实例属性
  Object.defineProperty(Vue.prototype, '$eventHub', {
    get: function () {
      return eventHub
    },
  })
  // Vue添加全局属性
  Vue.eventHub = eventHub
}

// auto install in dist mode
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

const VueEventHub = {
  install: install,
}

export default VueEventHub

