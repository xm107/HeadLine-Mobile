<template>
  <div class="channel-edit">
      <!-- 我的频道 -->
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <!-- 我的频道循环选项 -->
      <van-grid class="van-hairline--left">
         <!-- 循环渲染我的频道 -->
        <van-grid-item  v-for="(item,index) in channels" :key="item.id">
            <!-- 点击频道项的时候 需要把当前点击的频道id传出去 也可以传索引 -->
          <!-- <span @click="$emit('selectChannel', item.id)" class="f12">{{ item.name }}</span> -->
           <span @click="$emit('selectChannel', index)" :class="{red: index === activeIndex}"  class="f12">{{ item.name }}</span>
          <!--叉号标签 应该 在进入编辑状态时显示 应该在 退出编辑状态时不显示 -->
          <!-- 因为第一个永远不显示 所以说条件应该加一个 不等于0 -->
            <!-- 点击叉号应该调用父组件的删除方法 传出当前要删除的id  -->
          <van-icon @click="$emit('delChannel', item.id)" v-if="index!==0 && editing" class="btn" name="cross"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 可选频道 -->
    <!-- 我的频道的数据 是当前用户自己的频道（在登录状态下用户自己的频道，匿名状态下自己的频道） -->
    <!-- 可选频道 = 全部频道-我的频道 -->
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="item in optionalChannels" :key="item.id">
          <span class="f12">{{item.name}}</span>
           <!-- 找到+号图标 注册点击事件 触发一个自定义事件 并且 传出一个频道对象 -->
          <van-icon class="btn" name="plus" @click="$emit('addChannel', item)"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  data () {
    return {
      editing: false, // 正在编辑状态 用这个状态来控制是否显示 删除图标
      allChannels: [] // 定义一个变量接收全部的数据
    }
  },
  //   props: ['channels'] // 接收频道数据
  props: {
    channels: {
      // required 必传  type 类型 default  默认值
      required: true, // 表示必须传递channels
      type: Array, // 数组类型
      default: () => [] // 默认值给一格空数组 表示 此函数默认返回一个空数组
    },
    activeIndex: {
      required: true, // 表示必须传递channels
      type: Number, // 指定type是number类型
      default: 0
    }
  },
  methods: {
    async getAllChannels () {
      const data = await getAllChannels() // 获取所有频道
      this.allChannels = data.channels // 直接把频道数据赋值给频道
    }
  },
  // 计算属性   可选数据是一个动态的结果 全部频道（data）-用户频道（props）=>重新计算频道数据=>缓存
  computed: {
    // 可选频道计算属性必须要求有返回值
    optionalChannels () {
      // 全部频道-当前频道
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  },
  created () {
    this.getAllChannels() // 调用组件方法
  }
}
/**
 *
 * **/
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
