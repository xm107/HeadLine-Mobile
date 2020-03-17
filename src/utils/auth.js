/*****
 * auth.js 专门处理 token的读写和删除
 *   create by  2020/3/15
 * *****/
const USER_TOKEN = 'heima-toutiao-mobile-94' // 专门用来存储用户信息

// 设置用户的token信息
export function setUser (user) {
  // user应该是一个对象
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user)) // 对象需要转化成字符串
}

// 获取用户的token信息
export function getUser () {
  //  将字符串转化转化成对象再返回
  return JSON.parse(window.localStorage.getItem(USER_TOKEN) || '{}') // 短路表达式
  // 如果前面为true  后面不执行 如果前面为false 后面才执行
}

// 删除用户的token信息
export function delUser () {
  // 删除token信息
  localStorage.removeItem(USER_TOKEN) // 删除用户信息
}

/* - token => jwt => 前后分离项目
- (传统项目)session 存储用户身份信息  =>存于后端服务器
- (传统项目)cookie存在前端  =>  cookie携带了 sessionId => 后端sessionId可以拿到用户信息  => 传统方式的获取身份的方式 => 前后一体
- token => 前后分离时代  => 登录  => 返回一个token (令牌 ) => 请求时间.协议头.身份信息 => 返回给前端
- 黑马 头条  => 登录  => 换取token /refreshToken =>以后的接口请求中,都要携带token
- token => 本地 => localStorage => 浏览器关闭依然存在 => 特别适用于 移动端
 */
