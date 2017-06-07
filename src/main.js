// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VTooltip from 'v-tooltip'
import chart from './components/Github-Chart'

Vue.config.productionTip = false;
Vue.use(VTooltip)
Vue.component('chart', chart)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
