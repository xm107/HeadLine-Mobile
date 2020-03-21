<template>
  <div class="container">
    <!-- 放置tabs组件 -->
    <van-tabs>
      <!-- 内部放置子标签 -->
      <!-- 内部需要放置 子标签 title 值为当前显示的内容 -->
       <!-- 拿到channels数据之后吧 应该做什么 -->
         <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- <div class="scroll-wrapper">
          <van-cell-group>
            <van-cell :title="`标题${item}`" value="内容" v-for="item in 20" :key="item"></van-cell>
          </van-cell-group>
        </div> -->
        <!-- 有多少个tab就有多少个articles-list实例 -->
         <!-- 需要将频道id传递给每一个列表组件  父 => 子 props -->
         <!-- 监听article-list触发的showAction事件 -->
             <ArticleList @showAction="openAction" :channel_id="item.id"></ArticleList>
      </van-tab>
    </van-tabs>
    <span class="bar_btn">
      <van-icon name="wap-nav" />
    </span>
    <!-- 放置一个弹层组件 -->
      <van-popup v-model="showMoreAction" style="width: 80%">
        <!-- 放置反馈的组件 -->
        <MoreAction />
      </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/articles-list'
import MoreAction from './components/more-action'
import { getMyChannels } from '@/api/channels'
export default {
  name: 'Home',
  components: {
    ArticleList, MoreAction
  },
  // 组件中为什么data是 返回一个新对象
  data () {
    return {
      channels: [], // 接收频道数据
      showMoreAction: false, // 是否显示弹层 默认不显示组件
      articleId: null // 用来接收 点击的文章的id
    }
  },
  methods: {
    async  getMyChannels () {
      const data = await getMyChannels() // 接收返回的数据结果
      this.channels = data.channels // 将数据赋值给data中的数据
    },
    // 此方法 会在article-list组件触发 showAction的时候 触发
    openAction (artId) {
      // 此时应该弹出反馈的层
      this.showMoreAction = true
      //  应该把id给存储起来
      this.articleId = artId
    },
    created () {
    // 直接获取频道数据
      this.getMyChannels()
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
