/**
 *专门处理用户相关的请求
 *
 * ***/
import request from '@/utils/request'// 引入请求模块
// request 相当于axios的一个实例 和axios有同样的方法属性
/**
 * 登录方法
 * **/
export function login (data) {
  return request({
    // 配置选项
    url: '/authorizations', // 请求地址
    method: 'post',
    data// 接收传入的data
    // axios中body参数放置在data中
  })
//   返回一个promise对象
}
/**
 * 关注用户
 * **/
export function followUser (data) {
  return request({
    url: '/user/followings', // 关注用户
    method: 'post',
    data
  })
}

/**
 * 取消关注用户
 * **/
export function unfollowUser (autid) {
  return request({
    url: `/user/followings/${autid}`, // 关注用户
    method: 'delete'
  })
}
/***
 * 获取用户自己的个人信息  粉丝 数 /. 文章数
 * ***/

export function getUserInfo () {
  return request({
    url: '/user'
  })
}
/****
 * 获取用户的个人资料
 *
 * ***/
export function getUserProfile () {
  return request({
    url: '/user/profile'
  })
}
/****
 * 修改用户头像
 * ****/
export function updatePhoto (data) {
  return request({
    url: '/user/photo',
    method: 'patch',
    data // body参数
  })
}
