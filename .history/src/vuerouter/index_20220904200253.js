/*
 * @Description:
 * @version:
 * @Author: Murphy
 * @Date: 2022-04-02 11:34:38
 * @LastEditTime: 2022-09-04 20:02:19
 */
let _Vue = null
export default class VueRouter {
  static install(Vue) {
    // 判断当前插件是否已经安装，确保只安装一次
    if (VueRouter.install.installed) return
    // vue构造函数记录到全局变量
    _Vue = Vue
    // 把创建vue实例时传入的router对象注入到所有vue实例上
    _Vue.mixin({
      beforeCreate() {
        // 组件的话不执行
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init()
        }
      }
    })
  }
  constructor(options) {
    // 规则
    this.options = options
    // 地址 + 组件
    this.routeMap = {}
    // 存储当前的路由地址并变成响应式
    this.data = _Vue.observable({
      current: '/'
    })
  }
  init() {
    this.createRouteMap()
    this.initComponents(_Vue)
    this.initEvent()
  }
  // 处理路由规则 把路由规则解析成键值对的形式
  createRouteMap() {
    this.options.routes.forEach(route => {
      this.routeMap[route.path] = route.component
    })
  }

  initComponents(Vue) {
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template:'<a :href="to"><slot></slot></a>'
      render(h) {
        return h('a', {
          attrs: {
            href: this.to
          },
          on: {
            click: this.clickHandler
          }
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          history.pushState({}, '', this.to)
          this.$router.data.current = this.to
          e.preventDefault()
        }
      }
    })
    const self = this
    Vue.component('router-view', {
      render(h) {
        const component = self.routeMap[self.data.current]
        return h(component)
      }
    })
  }
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
