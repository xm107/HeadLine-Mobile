<template>
  <!-- 文章列表组件 放置列表 -->
  <!-- van-list 可以帮我们实现上拉加载  需要变量-->
  <!-- 这里注意 这个div设置了滚动条 目的是 给后面做 阅读记忆 留下伏笔 -->
        <!-- 阅读记忆 => 看文章看到一半 滑到中部 去了别的页面 当你回来时 文章还在你看的位置 -->
  <div class="scroll-wrapper">
      <!-- 文章列表 -->
      <!-- van-list组件 如果不加干涉，初始化完毕 就会检测自己距离底部的长度，如果超出了限制，就会执行load事件，自动把绑定的loading 变成true -->
    <van-list v-model="upLoading" :finished="finished" @load="onLoad">
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      upLoading: false, // 表示 是否开启了上拉加载 默认值为false
      finished: false // 表示 是否已经挖成所有数据的加载
    }
  },
  methods: {
    onLoad () {
    // 下面这么写 依然不能关掉加载状态 为什么 ? 因为关掉之后  检测机制  高度还是不够 还是会开启
    //   setTimeout(() => {
    //     this.upLoading = false
    //   }, 1000) // 等待一秒 然后关闭加载状态
      // 如果你有数据 你应该 把数据到加到list中
      // 如果想关掉
      setTimeout(() => {
        this.finished = true // 表示 数据已经全部加载完毕 没有数据了
      }, 1000) // 等待一秒 然后关闭加载状态
    }
  }
}
</script>

<style>
</style>
