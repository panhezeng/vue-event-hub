import Vue from 'vue'
import VueEventHub from '../dist/vue-event-hub-store.min'
import App from './components/App.vue'

Vue.use(VueEventHub)

new Vue({
  el: '#app',
  render: h => h(App)
})
