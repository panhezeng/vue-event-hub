# vue-event-hub

## 示例

[点击预览](https://panhezeng.github.io/vue-event-hub/)

示例代码目录 /example

## 说明

    一个全局挂载的vue实例，可以全局访问，分两个版本，默认版本是纯事件hub版本，另一个是带数据管理功能的版本
    覆写的API为以下：
    on
    off
    watch

    扩展API
    setData
    getData
    delData


    因为VueEventHub是全项目共用vue实例，所以覆写了on off实例方法，并提供了setData getData delData实例方法，这些方法对事件和数据操作进行了检查校验，并提供了相应的提示。
    因为hot热更新也会触发这个插件实例方法的错误警告提示，为了不影响hot更新调试，使用console.warn，而没有使用throw。
    本组件没有太复杂的东西，放心使用，如果有需求，可以fork修改。
    修改了output方式，通过require或window方式使用，不需要加.default
    /**
     * @param event 如果值为假，则清除所有eventHub的所有事件
     * @param callback 如果值为假，则清除event参数的对应事件的所有监听函数
     */
    function off (event, callback)

    打包 polyfills 应当是最终使用组件的应用的责任

## 用法

### internal vue 方式

`npm i vue @panhezeng/vue-event-hub -S`

#### 默认不带数据管理功能的纯事件 hub，可以搭配 vuex 使用

```javascript
import Vue from "vue";
import VueEventHub from "@panhezeng/vue-event-hub";
Vue.use(VueEventHub);
```

#### 带数据管理功能的事件 hub, 极简版 vuex

```javascript
import Vue from "vue";
import VueEventHub from "@panhezeng/vue-event-hub/dist/vue-event-hub-store.min.js";
Vue.use(VueEventHub);
```

### external vue 方式

```html
<script src="https://cdn.jsdelivr.net/npm/vue@latest/dist/vue.min.js"></script>
```

`npm i @panhezeng/vue-event-hub -S`

```javascript
// auto install
import "@panhezeng/vue-event-hub";
```

or

```html
<!--auto install-->
<script src="https://cdn.jsdelivr.net/npm/@panhezeng/vue-event-hub@latest/dist/vue-event-hub-index.min.js"></script>
```

```javascript
console.log(Vue.eventHub);
```

#### 事件名和数据属性名，建议单独写一个静态类，这样管理使用方便，比如下面例子中的 AppSetUser 和 user

```vue
<script>
const Event = {
  AppSetUser: "AppSetUser"
};
export default {
  name: "App",
  data() {
    return {
      user: []
    };
  },
  created() {
    this.$eventHub.watch("user", (newVal, oldVal) => {
      console.log(this.$eventHub.getData("user"), newVal, oldVal);
      this.user.push(
        newVal ? JSON.stringify(this.$eventHub.getData("user")) : "undefined"
      );
    });
    this.$eventHub.on(Event.AppSetUser, this.setUser);
    this.$eventHub.emit(Event.AppSetUser, { name: "phz1" });
    setTimeout(() => {
      this.$eventHub.delData("user");
      // 这个事件已经监听不到了，因为setUser后off了
      this.$eventHub.emit(Event.AppSetUser, { name: "phz2" });
    }, 600);
  },
  methods: {
    setUser(data) {
      this.$eventHub.setData("user", data, true);
      this.$eventHub.off(Event.AppSetUser, this.setUser);
    }
  }
};
</script>
```

## 编译

```bash
# install dependencies
npm install

# 运行插件使用示例
npm run dev:example

# 编译插件
npm run build

# 发版
npm set registry https://registry.npmjs.org/ && npm set @panhezeng:registry https://registry.npmjs.org/ && npm version patch && npm publish --access public && npm set registry https://registry.npm.taobao.org/ && npm set @panhezeng:registry https://registry.npm.taobao.org/

```
