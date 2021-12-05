import '@babel/polyfill'
import 'mutationobserver-shim'
import './plugins/bootstrap-vue'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueLoaders from 'vue-loaders'
import HighchartsVue from 'highcharts-vue'
import VueNativeNotification from 'vue-native-notification'
// import './registerServiceWorker'

Vue.config.productionTip = false

// HighchartsVue.dateFormat("Month: %m Day: %d Year: %Y", 20, false)
Vue.use(VueLoaders)
Vue.use(HighchartsVue)
Vue.use(VueNativeNotification)

navigator.serviceWorker.register('/sw.js');

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
