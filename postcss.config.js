// 此文件专门处理postcss插件
module.exports = {
// 所有的postcss插件
  plugins: {
    // 自动给css样式加前缀的属性 display:flex => 300/ rootValue = rem  =>自动其他浏览器的前缀
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 37.5, // 基准值 font-size: 30px / 37.5 =>  300 / rootValue =rem
      propList: ['*'] // 包括哪些文件 所有的文件都转化为rem
    }
  }
}

/* - rootValue 是转换px的基准值，参考设备iPhone6，设备宽度375px。
- flexible 在iPhone6设备设置的  html--->font-size 也为37.5px 。
- 但是 设计稿 尺寸750px 大小，所以在设计稿量取的尺寸使用时候需要  除以2  。

设计图  => 28px => 14px /37.5 = rem
 */
