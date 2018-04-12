import Vue from 'vue'
import VueEventHub from '../vue-event-hub.js'
import App from './components/App.vue'

Vue.use(VueEventHub)

new Vue({
  el: '#app',
  render: h => h(App),
})
