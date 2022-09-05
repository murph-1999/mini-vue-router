/*
 * @Description:
 * @version:
 * @Author: Murphy
 * @Date: 2022-04-02 10:22:43
 * @LastEditTime: 2022-04-02 16:32:21
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import css from '@/assets/index.css'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
