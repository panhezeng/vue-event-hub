import Vue from 'vue'
import VueEventHub from './plugins/vue-event-hub'
import App from './components/App.vue'

Vue.use(VueEventHub)

new Vue({
  el: '#app',
  render: h => h(App),
})
