import Vue from 'vue'
import App from './components/App.vue'
require('../dist/vue-event-hub-store.min')
//import VueEventHub from '../dist/vue-event-hub-store.min'

//Vue.use(VueEventHub)

new Vue({
  el: '#app',
  render: h => h(App)
})
