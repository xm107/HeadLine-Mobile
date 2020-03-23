<template>
  <div class='container'>
    <!-- 头部导航 显示返回箭头 -->
    <!-- click-left 点击左侧事件 -->
    <!-- $router.back()$router.back(-1) -->
     <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />

      <!-- 放置搜索结果列表 实现上拉加载 -->
      <van-list v-model="upLoading" @load="onLoad" :finished="finished" >
        <!-- 页面基本布局 -->
        <van-cell-group>
          <van-cell v-for="item in articles" :key="item.art_id.toString()">
            <div class="article_item" >
              <h3 class="van-ellipsis">{{item.tittle}}</h3>
              <div class="img_box" v-if="item.cover.type ===3">
                <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <div class="img_box" v-if="item.cover.type ===1">
                <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <div class="info_box">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}</span>
                <!-- 用过滤器来处理相对时间 -->
                <span>{{item.pubdate|relTime}}</span>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-list>
  </div>
</template>

<script>
import * as Articles from '@/api/articles'
// import {Articles}from '@/api/articles'
export default {
  data () {
    return {
      upLoading: false, // 上拉加载状态
      finished: false, // 表示当前的加载是否都完成了 若全部完成finished->true
      articles: [], // 放置搜索结果文章的
      page: {
        page: 1, // 当前页
        per_page: 10 // 每页条数
      }
    }
  },
  methods: {
    // 该方法会在滚动条底部滚动到底部时时候执行
    async onLoad () {
      // 加载数据
      const { q } = this.$route.query // 获取query参数
      const data = await Articles.searchArticle({ ...this.page, q })
      // 得到的结果应该追加到article数据
      this.articles.push(...data.results) // 上拉加载触发时，将数据追加到队尾
      // 关闭上拉加载的状态
      this.upLoading = false
      // 如何来判断 已经上拉加载 把所有的数据全部都查询过来？
      // 接口并没有告诉我们 什么时候结束 可以根据当前  返回的数据 是否有记录
      // 如果 你返回的查询记录是0 此时我认为没有下一页的数据了
      if (data.results.length) {
        // 我认为有下一页
        this.page.page++ // 如果有下一页 应该把页码切到下一页
      } else {
        // 否则是没有下一页的
        this.finished = true // 结束，没有数据
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
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
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>
