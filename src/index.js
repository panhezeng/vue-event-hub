/**
 * 因为VueEventHub是全项目共用vue实例，所以覆写了on off实例方法，对事件操作进行了检查校验，并提供了相应的提示
 * 因为hot热更新也会触发这个插件实例方法的错误警告提示，为了不影响hot更新调试，使用console.warn，而没有使用throw
 */


let Vue

function install (_Vue) {

  if (Vue) {
    console.warn('[VueEventHub] already installed. Vue.use(VueEventHub) should be called only once.')
    return
  }

  Vue = _Vue

  const eventHub = new Vue({
    data: {
      events: {},
    },
  })

  function on (event, callback) {
    if (Object.prototype.toString.call(event) === '[object String]' && Object.prototype.toString.call(callback) === '[object Function]') {
      if (Object.prototype.toString.call(eventHub.events[event]) !== '[object Array]') {
        eventHub.events[event] = []
      }
      const events = eventHub.events[event]
      const cbIndex = events.indexOf(callback)
      if (cbIndex === -1) {
        events.push(callback)
        eventHub.$on(event, callback)
      } else {
        console.log(event + '事件已经监听' + callback + '函数 --eventHub.on')
      }
    } else {
      throw 'event必须为字符串，callback必须为函数 --eventHub.on'
    }
  }

  function off (event, callback, force) {
    let events
    let cbIndex
    if (force) {
      if (Object.prototype.toString.call(event) === '[object String]') {
        events = eventHub.events[event]
        if (Object.prototype.toString.call(events) === '[object Array]') {
          if (Object.prototype.toString.call(callback) === '[object Function]') {
            cbIndex = events.indexOf(callback)
            if (cbIndex !== -1) {
              events.splice(cbIndex, 1)
              eventHub.$off(event, callback)
            }
          } else {
            eventHub.events[event] = []
            eventHub.$off(event)
          }
        }
      } else {
        eventHub.events = {}
        eventHub.$off()
      }
    } else {
      if (Object.prototype.toString.call(event) === '[object String]' && Object.prototype.toString.call(callback) === '[object Function]') {
        events = eventHub.events[event]
        if (Object.prototype.toString.call(events) === '[object Array]') {
          cbIndex = events.indexOf(callback)
          if (cbIndex === -1) {
            console.log(event + '事件没有监听' + callback + '函数 --eventHub.off')
          } else {
            events.splice(cbIndex, 1)
            eventHub.$off(event, callback)
          }
        } else {
          console.log('没有' + event + '事件 --eventHub.off')
        }
      } else {
        throw 'event必须为字符串，callback必须为函数，如果想移除全部事件或某事件的全部监听函数，请传force为真 --eventHub.off'
      }
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

