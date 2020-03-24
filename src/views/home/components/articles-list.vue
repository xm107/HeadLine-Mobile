<template>
  <!-- 文章列表组件 放置列表 -->
  <!-- van-list 可以帮我们实现上拉加载  需要变量-->
  <!-- 这里注意 这个div设置了滚动条 目的是 给后面做 阅读记忆 留下伏笔 -->
  <!-- 阅读记忆 => 看文章看到一半 滑到中部 去了别的页面 当你回来时 文章还在你看的位置 -->
  <div class="scroll-wrapper">
    <!-- 文章列表 -->
     <!-- van-list组件 如果不加干涉, 初始化完毕 就会检测 自己距离底部的长度,如果超过了限定 ,就会执行 load事件  自动把
       绑定的 loading 变成true
    -->
    <!-- 下拉刷新组件 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="successText">
      <!-- van-list组件 如果不加干涉，初始化完毕 就会检测自己距离底部的长度，如果超出了限制，就会执行load事件，自动把绑定的loading 变成true -->
      <van-list finished-text="没有啦！" v-model="upLoading" :finished="finished" @load="onLoad">
        <!-- 循环内容 -->
        <van-cell-group>
          <!-- item.art_id 此时是一个大数字的对象，v-for的key需要字符串或者数字代理 -->
           <!-- 给van-cell 加一个to属性 可以跳转到对应地址 -->
          <van-cell :to="`/article?artId=${item.art_id.toString()}`" v-for="item in articles" :key="item.art_id.toString()">
            <!-- 放置元素 文章列表的循环项  无图 三图 单图 -->
            <!-- 三图 -->
            <div class="article_item">
              <!-- 标题 -->
              <h3 class="van-ellipsis">{{ item.title }}</h3>
              <!-- 根据当前封面的类型决定显示单图 三图还是无图 -->
              <!-- 三图 -->
              <!-- lazy-load 表示懒加载 -->
              <div class="img_box" v-if="item.cover.type ===3">
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
                <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
              </div>
              <!-- 单图 暂时隐藏单图 -->
              <div class="img_box" v-if="item.cover.type ===1">
                <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]" />
              </div>
              <!-- 作者信息 -->
              <div class="info_box">
                <span>{{item.aut_name}}</span>
                <span>{{item.comm_count}}评论</span>
                <!-- 使用过滤器 -->
                <span>{{item.pubdate | relTime}}</span>
               <!-- 此叉号的显示 应该根据当前的登录状态来判断 如果登录了 可以显示 如果没有登录 不显示 -->
                <!-- 最原始方式 -->
                <!-- <span class="close" v-if="$store.state.user.token"> -->
               <!-- 辅助函数的形式 -->
               <!-- @事件名="逻辑处理"  点击事件中触发一个 显示反馈的事件 传出 点击的文章id-->
               <span @click.stop="$emit('showAction')" class="close" v-if="user.token">
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
import { mapState } from 'vuex'
import { getArticles } from '@/api/articles'
import eventBus from '@/utils/eventbus'
export default {
  // 初始化函数
  created () {
    // 监听删除文章事件
    // 相当于 有多少个实例 就有多少个监听
    // delAriticle  => 假如有四个实例  4个函数
    eventBus.$on('delArticle', (artId, channelId) => {
      // 这个位置 每个组件实例都会触发
      // 这里要判断一下 传递过来的频道是否等于 自身的频道
      if (channelId === this.channel_id) {
        // 说明当前的这个article-list实例 就是我们要去删除数据的实例
        const index = this.articles.findIndex(item => item.art_id.toString() === artId)
        // 通过id 查询对应的文章数据所在的下标
        if (index > -1) {
          // 因为下标从0开始 所以应该大于-1
          this.articles.splice(index, 1) // 删除对应下标的数据
        }
        // 但是 如果你一直删除 就会将 列表数据都删光 并不会触发 load事件
        if (this.articles.length === 0) {
          //  说明你把数据给删光了
          this.onLoad() // 手动的触发onload事件 给页面加数据
        }
      }
    })
  },
  computed: {
    ...mapState(['user']) // 将user对象映射到计算属性中
  },
  data () {
    return {
      successText: '', // 刷新成功的文本
      downLoading: false, // 下拉刷新
      upLoading: false, // 表示 是否开启了上拉加载 默认值为false
      finished: false, // 表示 是否已经挖成所有数据的加载
      articles: [], // 文章列表
      timestamp: null // 定义一个时间戳属性 用来存储 历史时间戳
    }
  },
  //  props: ['channel_id'], // 字符串数组 接收方式 比较简单 易于上手
  // props 对象形式 可以约束传入的值 必填 传值类型
  props: {
    // key(props属性名): value(对象 配置)
    channel_id: {
      required: true, // 必填项 此属性的含义 true 要求该 props必须传
      type: Number, // 表示要传入的prop属性的类型
      default: null // 默认值的意思 假如你没有传入 prop属性 默认值 就会被采用
    }
  },
  methods: {
    // 上拉加载
    async onLoad () {
      // 如果你的数据已经加载完毕 应该把finished设置为true表示一切结束了 不再请求
      //  此时强制的判断总条数 如果超过100 就直接关闭
      // van-list组件 第一次加载 需要让list 组件出现滚动条 否则没有办法加载
      // if (this.articles.length > 50) {
      //   this.finished = true // 关闭加载
      // } else {
      //   // 1-60
      //   const arr = Array.from(
      //     Array(15),
      //     (value, index) => this.articles.length + index + 1
      //   )
      //   // 上拉加载 不是覆盖之前的数据 应该把数据追加到原数组的队尾
      //   this.articles.push(...arr)
      //   // 添加完数据要手动关掉loading
      //   this.upLoading = false
      // }

      // 下面这么写 依然不能关掉加载状态 为什么 ? 因为关掉之后  检测机制  高度还是不够 还是会开启
      //   setTimeout(() => {
      //     this.upLoading = false
      //   }, 1000) // 等待一秒 然后关闭加载状态
      // 如果你有数据 你应该 把数据到加到list中
      // 如果想关掉
      // setTimeout(() => {
      //   this.finished = true // 表示 数据已经全部加载完毕 没有数据了
      // }, 1000) // 等待一秒 然后关闭加载状态

      await this.$sleep() // 人为控制了请求的时间
      // timestamp: this.timestamp || Date.now()  若有历史时间戳就用它，没有则用当前时间戳
      const data = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() }) // 当前频道id
      // 获取内容
      this.articles.push(...data.results) // 追加到队尾
      this.upLoading = false// 关闭加载状态
      // 将历史时间戳 给timestamp 但赋值钱要判断 历史时间是否为0
      // 如果有历史时间戳0 -->说明此时已经没有数据了 应该宣布结束 finished true
      if (data.pre_timestamp) {
        // 若有历史时间戳 -->还有数据可以进行加载
        this.timestamp = data.pre_timestamp
      } else {
        this.finished = true
      }
    },

    // 下拉刷新
    async onRefresh () {
      await this.$sleep() // 人为控制了请求的时间
      // 下拉刷新应该发送最新的事件戳
      const data = await getArticles({
        channel_id: this.channel_id,
        timestamp: Date.now()// 永远传最新的数据时间戳
      })
      // 手动的关闭 下拉刷新的状态
      this.downLoading = false
      // 需要判断 最新的时间戳能否换的来数据  若能->把新数据整个替换旧数据 若不能->提示暂时没有新数据
      if (data.results.length) {
        // 如果有返回数据
        // 需要将整个的article替换
        this.articles = data.results // 历史数据全部被覆盖
        // 此时 之前的数据全部被覆盖 假如之前把数据拉到了低端 意味着 之前的finished已经true了
        if (data.pre_timestamp) {
          //
          this.finished = false // 重新唤醒列表让列表可以继续上拉下载
          this.timestamp = data.pre_timestamp // 记录历史时间戳给变量
        }
        this.successText = `更新了${data.results.length}条数据`
      } else {
        // 如果换不来新数据
        this.successText = '当前已经是最新了'
      }

      // setTimeout(() => {
      //   // 下拉刷新 表示要读取最新的数据 而且最新的数据要填加到数据头部
      //   const arr = Array.from(
      //     Array(2),
      //     (value, index) => '追加' + (index + 1)
      //   )
      //   // 数组添加到头部
      //   this.articles.unshift(...arr)
      //   // 手动关闭正在加载的状态
      //   this.downLoading = false
      //   this.successText = `已经为您更新了${arr.length}条数据`
      // }, 1000)
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
