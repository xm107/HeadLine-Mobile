<template>
  <!-- 文章列表组件 放置列表 -->
  <!-- van-list 可以帮我们实现上拉加载  需要变量-->
  <!-- 这里注意 这个div设置了滚动条 目的是 给后面做 阅读记忆 留下伏笔 -->
  <!-- 阅读记忆 => 看文章看到一半 滑到中部 去了别的页面 当你回来时 文章还在你看的位置 -->
  <div class="scroll-wrapper">
    <!-- 文章列表 -->
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="successText">
      <!-- van-list组件 如果不加干涉，初始化完毕 就会检测自己距离底部的长度，如果超出了限制，就会执行load事件，自动把绑定的loading 变成true -->
      <van-list finished-text="没有啦！" v-model="upLoading" :finished="finished" @load="onLoad">
        <!-- 循环内容 -->
        <van-cell-group>
          <van-cell v-for="item in articles" :key="item">
            <!-- 放置元素 文章列表的循环项  无图 三图 单图 -->
            <!-- 三图 -->
            <div class="article_item">
              <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
              <div class="img_box">
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <div class="info_box">
                <span>你像一阵风</span>
                <span>8评论</span>
                <span>10分钟前</span>
                <span class="close">
                  <van-icon name="cross"></van-icon>
                </span>
              </div>
            </div>
            <!-- 单图 -->
            <div class="article_item">
              <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
              <div class="img_box">
                <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <div class="info_box">
                <span>你像一阵风</span>
                <span>8评论</span>
                <span>10分钟前</span>
                <span class="close">
                  <van-icon name="cross"></van-icon>
                </span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>

export default {
  data () {
    return {
      successText: '', // 刷新成功的文本
      downLoading: false, // 下拉刷新
      upLoading: false, // 表示 是否开启了上拉加载 默认值为false
      finished: false, // 表示 是否已经挖成所有数据的加载
      articles: [] // 文章列表
    }
  },
  methods: {
    // 上拉加载
    onLoad () {
      // 如果你的数据已经加载完毕 应该把finished设置为true表示一切结束了 不再请求
      //  此时强制的判断总条数 如果超过100 就直接关闭
      // van-list组件 第一次加载 需要让list 组件出现滚动条 否则没有办法加载
      if (this.articles.length > 50) {
        this.finished = true // 关闭加载
      } else {
        // 1-60
        const arr = Array.from(
          Array(15),
          (value, index) => this.articles.length + index + 1
        )
        // 上拉加载 不是覆盖之前的数据 应该把数据追加到原数组的队尾
        this.articles.push(...arr)
        // 添加完数据要手动关掉loading
        this.upLoading = false
      }
      // 下面这么写 依然不能关掉加载状态 为什么 ? 因为关掉之后  检测机制  高度还是不够 还是会开启
      //   setTimeout(() => {
      //     this.upLoading = false
      //   }, 1000) // 等待一秒 然后关闭加载状态
      // 如果你有数据 你应该 把数据到加到list中
      // 如果想关掉
      // setTimeout(() => {
      //   this.finished = true // 表示 数据已经全部加载完毕 没有数据了
      // }, 1000) // 等待一秒 然后关闭加载状态
    },

    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        // 下拉刷新 表示要读取最新的数据 而且最新的数据要填加到数据头部
        const arr = Array.from(
          Array(2),
          (value, index) => '追加' + (index + 1)
        )
        // 数组添加到头部
        this.articles.unshift(...arr)
        // 手动关闭正在加载的状态
        this.downLoading = false
        this.successText = `已经为您更新了${arr.length}条数据`
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
