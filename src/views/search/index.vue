<template>
 <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <!-- 搜索组件 -->
     <van-search @search="onSearch"  v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
    <!-- 联想内容  有输入内容时 显示联想 -->
    <van-cell-group class="suggest-box" v-if="q" >
      <!-- 循环的搜索建议 -->
      <van-cell @click="toResult(item)" icon="search" v-for="(item,index) in suggestList" :key="index">
         {{ item  }}
      </van-cell>
    </van-cell-group>
    <!-- 历史记录部分  你搜索的内容 会在这里记录 -->
    <!-- <div class="history-box" v-if="!q"> -->
      <!-- 如果没有历史记录 隐藏掉 -->
    <div class="history-box" v-else>
      <!-- 只有当历史记录存在的时候 才显示头部 -->
      <div class="head" v-if="historyList.length">
        <span>历史记录</span>
        <!-- 清空操作 -->
        <van-icon @click="clear" name="delete"></van-icon>
      </div>
      <van-cell-group>
        <!-- 需要把这个位置变成动态的 -->
        <van-cell @click="toResult(item)" v-for="(item,index) in historyList" :key="index">
          <!-- 显示循环内容 -->
          <a class="word_btn">{{item}}</a>
          <!-- 注册点击叉号的事件 -->
          <!-- 两个点击事件此时事件冒泡了 js event.stopPagintion() -->
          <!-- vue 中可以用修饰符  直接阻止冒泡-->
          <van-icon @click.stop="delHistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/articles' // 引入获取建议的接口
const key = 'HeadLine-Mobile' // 此key用来作为 历史记录在本地缓存中的key
export default {
  name: 'search',
  data () {
    return {
      q: '', // 关键字的数据
      // 当data初始化的时候 会读取后面数据
      // history: [] // 作为数据变量 接受 搜过的历史记录
      historyList: JSON.parse(localStorage.getItem(key) || '[]'), // 作为一个数据接收历史数据
      suggestList: [] // 联想的搜索建议
    }
  },
  watch: {
    q () {
      // 我们要在这个位置 去请求接口、
      clearTimeout(this.timer) // 先清除掉定时器
      // 防抖函数
      this.timer = setTimeout(async () => {
        // 需要判断 当清空的时候 不能发送请求 但是要把联想的建议清空
        if (!this.q) {
          // 若这时没有搜索内容
          this.suggestList = []
          // 不能继续了
          return
        }
        // 此函数中需要 请求 联想搜索的建议
        // 联想的搜索建议 需要放置在一个变量当中
        const data = await getSuggestion({ q: this.q })
        this.suggestList = data.options // 将返回的词条的option赋值给当前的联想建议
      }, 300)
    }
    /*  // 函数节流
    q () {
      if (!this.timer) {
      // 要求三百毫秒执行一次
        this.timer = setTimeout(async () => {
          // 先将标记设置为空
          this.timer = null
          // 需要判断 当清空的时候 不能发送请求 但是要把联想的建议清空
          if (!this.q) {
            // 如果这时 搜索关键字没有内容
            this.suggestList = []
            // 不能再继续了
            return
          }
          // 此函数中需要 请求 联想搜索的建议
          // 联想搜索的建议 需要 放置在一个变量中
          const data = await getSuggestion({ q: this.q })
          this.suggestList = data.options // 将返回的词条的options赋值给 当前的联想建议
        }, 300)
      } */
  },
  methods: {
    // 删除历史
    delHistory (index) {
      // 要现在本地data中删除，然后把data中的数同步到 本地缓存中
      this.historyList.splice(index, 1) // 直接删除对应的历史记录数据
      // 将数据同步到本地缓存
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },
    // 跳到搜索结果项
    // toSearchResult (text) {
    //   // this.$route  当前的路由页面对象信息 当前地址 params参数 query参数
    //   // this.$router  路由对象实例
    //   // 路由传参params.query
    //   // this.$router.push('/search/result?q=' + text) // 采用query传参
    //   this.$router.push({ path: '/search/result', query: { q: text } })
    // },
    // 到结果页
    toResult (text) {
      // 应该也把这个text 放在历史记录中
      this.historyList.push(text) // 加到历史记录
      // 有可能重复
      this.historyList = Array.from(new Set(this.historyList))// 去重
      // 设置到本地换存中
      localStorage.setItem(key, JSON.stringify(this.historyList))// 历史记录设置到缓存中
      // 将数据同步到本地缓存
      localStorage.setItem(key, JSON.stringify(this.historyList))
      // 跳转到搜索结果
      this.$router.push({ path: '/search/result', query: { q: text } })
    },
    // 清空历史记录
    async clear () {
      // 直接清空历史记录
      // 一般来说 删除内容之前要提示
      try {
        this.$dialog.confirm({
          title: '提示',
          message: '确定删除所有历史记录吗?'
        })
        // 会执行下面代码
        this.historyList = [] // 将本地历史记录设置为空
        localStorage.setItem(key, '[]') // 同步设置历史记录为空
      } catch (error) {
        // 失败不需要处理
      }
    },
    onSearch () {
      // 判断 搜索内容 为空  直接返回
      if (!this.q) return
      // 应该在跳转之前应该把搜索的结果 添加到历史记录
      // 去重
      this.historyList.push(this.q) // 将搜索内容假如到历史记录
      this.historyList = Array.from(new Set(this.historyList)) // 去重
      localStorage.setItem(key, JSON.stringify(this.historyList)) // 设置为本地缓存
      // 搜索事件触发时 应该跳到 搜索结果页 并且携带参数
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    }
  }
  // created () {
  //   // 钩子函数 实例初始化之后
  //   this.historyList = JSON.parse(localStorage.getItem || '[]')
  // }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
