
const Time = new Date().getTime();
module.exports = {
  publicPath: '/', // 根目录
  outputDir: 'nlpWeb', //构建输入目录
  assetsDir: 'assets',  //静态资源目录
  lintOnSave: false, // 是否开启eslint 保存检测， 有效值是 false || true || 'error'
  productionSourceMap: false,
  transpileDependencies: [],
  configureWebpack: {
    output: {
      filename: `js/[name].${Time}.js`,
      chunkFilename: `js/[name].${Time}.js`,
    },
  },
  configureWebpack: (config)=>{
    if(process.env.NODE_ENV === 'production'){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 8084,
  }
}
