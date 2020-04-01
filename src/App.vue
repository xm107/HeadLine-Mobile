<template>
  <div id="app">
    <!-- 一级路由容器 -->
    <!-- 如果不加控制，会缓存所有的组件 -->
    <!-- 不加keep-alive包裹就不会缓存 -->
    <keep-alive>
      <!-- 当缓存时 里面的生效 -->
      <router-view  v-if="$route.meta.isAlive" />
    </keep-alive>
    <!-- 条件渲染 当不缓存时 外面的生效-->
    <router-view v-if="!$route.meta.isAlive"></router-view>
    <!-- 要根据meta中的isAlive 属性 决定是否缓存组件
        $route.meta.isAlive
     -->
  </div>
</template>

<style lang="less">
</style>
