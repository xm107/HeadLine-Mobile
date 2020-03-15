<template>
  <div class="container">
    <!-- 导航 显示返回箭头 $router.back()与$router.go(-1) 返回上一页-->
    <van-nav-bar title="编辑资料" left-arrow  @click-left="$router.back()" right-text="保存"></van-nav-bar>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
