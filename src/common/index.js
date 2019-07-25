export default function(eventHub) {
  function on(event, callback) {
    if (
      /^\[object String\]$/.test(Object.prototype.toString.call(event)) &&
      /^\[object [^F]*Function\]$/.test(
        Object.prototype.toString.call(callback)
      )
    ) {
      if (
        !/^\[object [^A]*Array\]$/.test(
          Object.prototype.toString.call(eventHub.events[event])
        )
      ) {
        eventHub.events[event] = [];
      }
      const events = eventHub.events[event];
      const cbIndex = events.indexOf(callback);
      if (cbIndex === -1) {
        events.push(callback);
        eventHub.$on(event, callback);
      } else {
        console.log(event + "事件已经监听" + callback + "函数 --eventHub.on");
      }
    } else {
      throw "event必须为字符串，callback必须为函数 --eventHub.on";
    }
  }

  /**
   * @param event 如果值为假，则清除所有eventHub的所有事件
   * @param callback 如果值为假，则清除event参数的对应事件的所有监听函数
   */
  function off(event, callback) {
    let events;
    let cbIndex;
    if (/^\[object String\]$/.test(Object.prototype.toString.call(event))) {
      events = eventHub.events[event];
      if (
        /^\[object [^A]*Array\]$/.test(Object.prototype.toString.call(events))
      ) {
        if (
          /^\[object [^F]*Function\]$/.test(
            Object.prototype.toString.call(callback)
          )
        ) {
          cbIndex = events.indexOf(callback);
          if (cbIndex === -1) {
            console.log(
              event + "事件没有监听" + callback + "函数 --eventHub.off"
            );
          } else {
            events.splice(cbIndex, 1);
            eventHub.$off(event, callback);
          }
        } else {
          eventHub.events[event] = [];
          eventHub.$off(event);
        }
      } else {
        console.log("没有" + event + "事件 --eventHub.off");
      }
    } else {
      eventHub.events = {};
      eventHub.$off();
    }
  }

  Object.defineProperties(eventHub, {
    on: {
      get: function() {
        return on;
      }
    },
    emit: {
      get: function() {
        return eventHub.$emit;
      }
    },
    off: {
      get: function() {
        return off;
      }
    }
  });
}
