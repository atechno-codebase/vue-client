import Vue from 'vue'
import Router from 'vue-router'
import Cards from '../components/Cards.vue'

Vue.use(Router)

export default new Router({
    routes: [
      { path: '/', component: Cards },
    ]
})
