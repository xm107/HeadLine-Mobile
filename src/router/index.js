import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 用按需加载的方式配置路由
const Layout = () => import('@/views/layout') // 按需引入layout 一级路由
const home = () => import('@/views/home') // 按需引入home 二级路由
const question = () => import('@/views/question')// 按需引入问答question 二级路由
const video = () => import('@/views/video')// 按需引入视频video 二级路由
const user = () => import('@/views/user')// 按需引入用户user 二级路由
// 其他的一级路由
const chat = () => import('@/views/user/chat') // 小智同学
const login = () => import('@/views/login') // 登录组件
const profile = () => import('@/views/user/profile') // 编辑资料组件
const search = () => import('@/views/search') // 搜索中心组件
const searchresult = () => import('@/views/search/result') // 搜索结果组件
const article = () => import('@/views/article') // 文章详情

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout, // 布局组件 一级路由
    children: [
      {
        path: '', // 如果path什么都不写，默认是二级路由的默认组件
        component: home,
        meta: { islive: true }
      }, {
        path: '/question',
        component: question // 问答组件
      }, {
        path: '/video',
        component: video // 视频组件
      }, {
        path: '/user',
        component: user // 用户组件
      }
    ]
  }, {
    path: '/user/chat',
    component: chat // 小智同学
  }, {
    path: '/login',
    component: login // 登录组件
  }, {
    path: '/user/profile',
    component: profile // 编辑资料组件
  }, {
    path: '/search',
    component: search // 搜索中心组件
  }, {
    path: '/search/result',
    component: searchresult // 搜索结果组件
  }, {
    path: '/article',
    component: article // 文章详情
  }
]

const router = new VueRouter({
  routes
})

export default router
