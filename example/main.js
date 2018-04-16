import Vue from 'vue'
import Index from '../src/index.js'
import App from './components/App.vue'

Vue.use(Index)

new Vue({
  el: '#app',
  render: h => h(App),
})
