import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 权限拦截模式
import store from './store'
import Vant, { Lazyload } from 'vant' // 引入vant组件 和LazyLoad
import plugin from '@/utils/plugin'// 引入plugin
import 'vant/lib/index.less' // 引入vant样式
import '@/styles/index.less' // 引入全局的自定义样式，因为要覆盖vant的样式
import 'amfe-flexible' // 修改rem基准值的js插件，需要在打包后需要使用，因为 需要在运行时 实时改变 font-size大小 根据屏幕

Vue.use(Vant) // 全局注册vant的所有组件 =>调用了vant的install方法
// 以上做法是完整导入，在项目开发阶段使用，配置方便节省时间，将来上线的时候可以使用按需导入。
// 按需引入  => 用哪个组件就注册哪个组件 ,没有必要在开发阶段 做,
// 在性能优化阶段做 按需引入最佳
Vue.use(Lazyload)
Vue.use(plugin) // 注册
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// export default Vant //默认对象
// export const Lazyload={}//平常对象
