/*
 * @Description:
 * @version:
 * @Author: Murphy
 * @Date: 2022-04-02 10:22:43
 * @LastEditTime: 2022-04-02 16:38:43
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
