/*
 * @Description:
 * @version:
 * @Author: Murphy
 * @Date: 2022-04-02 11:34:38
 * @LastEditTime: 2022-09-05 20:12:22
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
    // 传入的规则
    this.options = options
    // 地址 + 组件
    this.routeMap = {}
    // 存储当前的路由地址并变成响应式，observable内部调用的是observe
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
  // 实现router-link和router-view，注意Vue.component中发生了什么
  // 这里直接传入一个选项对象 (自动调用 Vue.extend)
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
          // pushState只会将目标url添加到序列中，并且出现在地址栏中，但并不会立即加载并跳转到这个页面，
          // 如果你访问了新的页面，点击返回按钮的时候，或者在当前页面刷新时，浏览器就会加载并跳转到你新添加的这个url
          history.pushState({}, '', this.to)
          //
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
  // 设置监听
  // 当在浏览器中点击后退，前进，或者在js中调用histroy.back()，history.go()，history.forward()等，会触发popstate事件
  initEvent() {
    window.addEventListener('popstate', () => {
      this.data.current = window.location.pathname
    })
  }
}
