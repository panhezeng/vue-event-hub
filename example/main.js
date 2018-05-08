import Vue from 'vue'
import VueEventHub from '../src/store'
import App from './components/App.vue'

Vue.use(VueEventHub)

new Vue({
  el: '#app',
  render: h => h(App),
})
