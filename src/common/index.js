export default function (eventHub) {
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
      }
    },
    emit: {
      get: function () {
        return eventHub.$emit
      }
    },
    off: {
      get: function () {
        return off
      }
    }
  })
}
