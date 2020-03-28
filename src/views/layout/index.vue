<template>
  <div class="container">
    <!-- 导航组件 采用vant组件的导航  fixed表示固定在顶部-->
    <!-- 当页面地址是/user时 应该隐藏 导航行，否则不隐藏 -->
    <!-- $router.push('/search') 跳转 -->
     <van-nav-bar @click-right="$router.push('/search')" fixed title="黑马头条" right-text="搜索" v-if="$route.path!== '/user'"></van-nav-bar>
      <!-- 二级路由容器 -->
      <!-- 判断当前地址 如果是/user 就给一个noTop class-->
      <div class="my-wrapper" :class="{noTop: $route.path === '/user'}">
       <!-- 直接缓存二级路由容器  直接使用keep-alive组件包裹 容器 -->
    <keep-alive>
      <!-- 一旦被包裹 路由容器里的组件就不会被销毁  -->
       <router-view></router-view>
    </keep-alive>
      </div>
    <!-- 标签栏组件 route表示 开启路由模式 router:router="true"(布尔)  route="true"(字符串)-->
    <van-tabbar route>
      <!-- 点击导航的标签跳转路由 -->
      <!-- 一旦开启路由模式 van-tabbar-item 就可以当做 router-link 使用-->
      <!-- router-link  to  -->
       <van-tabbar-item icon="wap-home-o" to="/">首页</van-tabbar-item>
        <van-tabbar-item icon="chat-o" to='/question'>问答</van-tabbar-item>
        <van-tabbar-item icon="tv-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" to="/user">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  // 控制二级路由容器的高宽
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
