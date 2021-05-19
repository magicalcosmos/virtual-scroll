import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import VirtualScroll from './plugins'
Vue.use(VirtualScroll);
new Vue({
  render: h => h(App),
}).$mount('#app')
