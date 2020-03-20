// import { Promise } from 'core-js'
import dayjs from 'dayjs'// 引入时间戳插件
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间的扩展
import 'dayjs/locale/zh-cn' // dayjs不会自动引入语言包 默认支持英文
dayjs.extend(relativeTime)

/***
 *  plugin.js 专门负责提供小函数以及vue中常用的过滤器及函数
 * **/
export default {
  // 导出一个默认对象
  install (Vue) {
    //   该方法会在Vue.use时会调用
    // 执行此行代码时Vue.protofytype.$notify 应该已经挂载完成
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
    // 给Vue的原型属性赋值一个函数 自定义一个函数名
    Vue.prototype.$sleep = sleep // 定义一个原型属性$sleep 所有组件都有了这个属性
    // 过滤器 全局  局部
    // Vue.filter(名称，函数)
    Vue.filter('relTime', relTime) // 注册一个全局过滤器
  }
}

// 休眠函数
// time=500若你传入time 用你自己的  若你没传 用time=500
function sleep (time = 500) {
  // 返回一个promise
  return new Promise(function (resolve, reject) {
    // 肯定是成功执行 但有一个延迟
    setTimeout(() => resolve(), time)
  })
}

/**
 * 次函数用来将日期转化为相对时间
 * @params date 传入的日期
 *
 * **/
function relTime (date) {
  // 还需要对dayjs进行语言包转化
  return dayjs().locale('zh-cn').from(date) // from(中的值是 日期或者dayjs得到的日期) dayjs() 当前时间 dayjs().from(date) 当前时间距离传入的时间有多远
}
