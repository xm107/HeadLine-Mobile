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
  },
  configureWebpack: (config) => {
    // config参数就是vue-cli项目中所有的webpack配置
    // 若需要改动 直接修改这个信息就行
    // 首先需要判断当前的打包环境是开发环境还是生产环境
    if (process.env.NODE_ENV === 'production') {
      // 只需要在生产环境中 吧所有console删除掉 并且打包 这里删除的console不是删除源代码的console 而是删除打包出来的console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      // 上面代码是根据webpack的配置得来的
      /* $ vue inspect --mode=production > demo.js #导出当前生产模式下的webpack配置文件到demo.js */
    }
  },
  publicPath: './' // 打包后的引用地址
}
