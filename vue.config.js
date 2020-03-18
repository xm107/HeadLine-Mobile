/***
 * 用它来修改vant主题中的css样式
 *需要导出一个对象
 * ***/
module.exports = {
  // 覆盖蓝色主题 需要更改less中变量的配置
  css: {
    //   css相关
    loaderOptions: {
      // 所有的关于样式loader相关选项
      less: {
        //
        modifyVars: {
          // 直接覆盖变量 变量名不需要@
          blue: '#3296fa'
        }
      }
    }
  }
}
