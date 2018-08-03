/**
 * 因为VueEventHub是全项目共用vue实例，所以覆写了on off实例方法，并提供了setData getData delData实例方法，这些方法对事件和数据操作进行了检查校验，并提供了相应的提示
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
      events: [],
      store: {}
    }
  })

  extendEventHub(eventHub)

  function setData (name, data, force) {
    if (Object.prototype.toString.call(name) !== '[object String]') {
      throw 'name必须为字符串 --eventHub.setData'
    }
    if (force || !eventHub.store.hasOwnProperty(name)) {
      let store = Object.assign({}, eventHub.store)
      store[name] = data
      eventHub.store = store
    } else {
      console.log(name + ':已有同名数据节点，请换个数据节点名，如要覆盖数据节点，请设置force参数为true --eventHub.setData')
    }
  }

  function getData (name) {
    if (Object.prototype.toString.call(name) !== '[object String]') {
      throw 'name必须为字符串 --eventHub.getData'
    }
    if (eventHub.store.hasOwnProperty(name)) {
      return eventHub.store[name]
    } else {
      console.log(name + ':没有该命名的数据节点，如有需要请用setData方法创建--$eventHub')
    }
  }

  function delData (name) {
    if (Object.prototype.toString.call(name) !== '[object String]') {
      throw 'name必须为字符串 --eventHub.delData'
    }
    if (eventHub.store.hasOwnProperty(name)) {
      let store = Object.assign({}, eventHub.store)
      delete store[name]
      eventHub.store = store
    } else {
      console.log(name + ':没有该命名的数据节点，删除无效--$eventHub')
    }
  }

  function watch (expOrFn, callback, options) {
    if (Object.prototype.toString.call(expOrFn) === '[object String]') {
      expOrFn = 'store.' + expOrFn
    }
    return eventHub.$watch(expOrFn, callback, options)
  }

  Object.defineProperties(eventHub, {
    setData: {
      get: function () {
        return setData
      }
    },
    getData: {
      get: function () {
        return getData
      }
    },
    delData: {
      get: function () {
        return delData
      }
    },
    watch: {
      get: function () {
        return watch
      }
    }
  })

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
