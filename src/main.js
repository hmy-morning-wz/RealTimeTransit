// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import routers from './router'
import VueRouter from 'vue-router'
import MintUI from 'mint-ui'
import VueAMap from 'vue-amap'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import '../node_modules/mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.css'
import store from './store'
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

Vue.config.performance = true
Vue.config.productionTip = true
if (process.env.NODE_ENV === 'production') {
  Raven
    .config('https://f39dd7a2cbd34f4ebcdc14db68bfdee6@sentry.io/1263965')
    .addPlugin(RavenVue, Vue)
    .install()
} else {
  Vue.config.debug = true
  // require('./mock/mockjs')
}

Vue.use(MintUI)
Vue.use(VueRouter)
Vue.use(VueAMap)
// 高德地图
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '80087a0431514fc08f05b6fabad3c8d5',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
})
// 创建一个路由对象用于管理页面的路由
const router = new VueRouter({
  routes: routers
})

router.beforeEach((to, from, next) => {
  next()
  // alert(to.meta.title)
  try {
    window.yl.call('setTitleBarText', {title: to.meta.title})
  } catch (err) {
    document.title = to.meta.title || '实时公交'
  }
})

Vue.use(VueAwesomeSwiper, {})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  renderError (h, err) {
    return h('pre', {style: { color: 'red' }}, err.stack)
  }
})
