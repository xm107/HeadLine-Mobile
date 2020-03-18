<template>
 <div class="container">
    <!-- 导航 显示返回箭头 $router.back()与$router.go(-1) 返回上一页-->
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()"></van-nav-bar>
     <!-- 登录布局 -->
    <!-- 外层需要用cell-group组件来包裹提供 边框 -->
    <van-cell-group>
        <!-- 登录手机号 -->
        <!-- v-model  有一个修饰符trim(可以帮助我们自动去除空格) -->
          <van-field label="手机号"
          @blur="checkMobile"
          v-model.trim="loginForm.mobile"
          :error-message="errorMessage.mobile"  placeholder="请输入手机号"></van-field>
        <!-- 验证码 -->
          <van-field label="验证码"
           @blur="checkCode"
           v-model.trim="loginForm.code"
           :error-message="errorMessage.code"  placeholder="请输入验证码">
            <!-- 插槽内容 -->
              <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class='login-box'>
      <van-button type="info" @click="login" round size="small" block>登录</van-button>
    </div>
   </div>
</template>

<script>
// import * as user from '@/api/user'y
// import { login } from '@/api/user'
// import { mapMutations } from 'vuex'// 辅助函数 可以吧mutations方法银蛇到methods方法中
export default {
  data () {
    return {
      // 表单数据
      loginForm: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      // 此对象专门放置消息
      errorMessage: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    // 定义检查手机号方法
    checkMobile () {
      // 获取手机号 判断 是否为空 满足手机号格式
      if (!this.loginForm.mobile) {
        // 表示为空
        this.errorMessage.mobile = '手机号不能为空'
        // 此时没有必要往下进行了
        return false // 返回一个false  表示此轮校验没通过 日过通过了 返回true
      }
      // 第二轮 手机号格式
      if (!/^1[3-9]\d{9}$/.test(this.loginForm.mobile)) {
        // 如果不满足正则
        this.errorMessage.mobile = '手机号格式不正确'
        return false
      }
      // 如果满足正则 通过了
      this.errorMessage.mobile = '' // 提示消息清空
      return true
    },
    // 验证码
    checkCode () {
      if (!this.loginForm.code) {
        this.errorMessage.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginForm.code)) {
        this.errorMessage.code = '验证码必须为6位数字'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    // 登陆校验
    login () {
      // 验证手机号和验证码
      // this.checkMobile()
      // this.checkCode()
      if (this.checkMobile() && this.checkCode()) {
        // 如果两个检查都是true，校验通过
        console.log('通过')
        // const result = await login(this.loginForm)
        // console.log(result) // 打印结果
      }
    }
  }
}
</script>

<style>
.login-box {
  padding: 20px
}
</style>
