/**
 * 因为VueEventHub是全项目通用vue实例，所以请用VueEventHub的on off setData getData delData实例方法，避免影响已存在的事件或数据
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

  function setData (name, data, force) {
    if (force || !eventHub.store.hasOwnProperty(String(name))) {
      let store = Object.assign({}, eventHub.store)
      store[String(name)] = data
      eventHub.store = store
    } else {
      console.warn(name + ':已有同名数据节点，请换个数据节点名，如要覆盖数据节点，请设置force参数为true--$eventHub')
    }
  }

  function getData (name) {
    if (eventHub.store.hasOwnProperty(String(name))) {
      return eventHub.store[String(name)]
    } else {
      console.log(name + ':没有该命名的数据节点，如有需要请用setData方法创建--$eventHub')
    }
  }

  function delData (name) {
    if (eventHub.store.hasOwnProperty(String(name))) {
      let store = Object.assign({}, eventHub.store)
      delete store[String(name)]
      eventHub.store = store
    } else {
      console.log(name + ':没有该命名的数据节点，删除无效--$eventHub')
    }
  }

  function watch (expOrFn, callback, options) {
    if (typeof expOrFn === 'string') {
      expOrFn = 'store.' + expOrFn
    }
    if (!options) {
      options = {
        deep: true,
        immediate: true,
      }
    }
    eventHub.$watch(expOrFn, callback, options)
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
    setData: {
      get: function () {
        return setData
      },
    },
    getData: {
      get: function () {
        return getData
      },
    },
    delData: {
      get: function () {
        return delData
      },
    },
    watch: {
      get: function () {
        return watch
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

