<template>
  <div>
    <!--  简单填充内容 -->
    <!-- 骨架屏 =>  当你进入页面,但是请求还没结束 数据还没有的时候 显示一个基本的 骨架-->

    <div class="split"></div>
    <van-skeleton title avatar :row="3" />
    <div class="split"></div>
    <van-skeleton title avatar :row="3" />
     <div class="split"></div>
    <van-skeleton title avatar :row="3" />
     <div class="split"></div>
    <van-skeleton title avatar :row="3" />

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
