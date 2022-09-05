/*
 * @Description:
 * @version:
 * @Author: Murphy
 * @Date: 2022-04-15 09:41:48
 * @LastEditTime: 2022-04-15 09:44:32
 */
export default class VueRouter {
  // 怕判断插件是否已经被加载
  static install(Vue) {
    if (Vue.install.installed) return
  }
}