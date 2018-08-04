const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 1.写好入口和输出
  entry: [
    'react-hot-loader/patch',
    path.join(__dirname, 'src/index.js')
  ],

  
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },


  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join(__dirname, 'src')
    }]
  },


  // 2. webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。
  // contentBaseURL的根目录。如果不设定的话，默认指向项目根目录。
  // "start": "webpack-dev-server --config webpack.dev.config.js --color --progress" 
  // 当打包的文件在内存中的时候就需要使用 HtmlWebpackPlugin插件了
  // devServer: {
  //   // port: 3000,
  //   contentBase: path.join(__dirname, './dist'),
  //   historyApiFallback: true,
  //   // host: '172.29.16.179'
  // },
  // plugins: [
  //   new HtmlWebpackPlugin(
  //     {
  //       filename: 'index.html',
  //       template: path.join(__dirname, 'src/index.html')
  //     }
  //   )
  // ],


  // 3 配置热模块替换HRM (局部刷新)
  // 方式一： "start": "webpack-dev-server --config webpack.dev.config.js --color --progress --hot" ，此处使用 --hot参数
  // 方式二：如下两处 新增 而不使用 --hot参数
  devServer: {
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    hot: true //新增
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html')
      }
    ),
    new webpack.HotModuleReplacementPlugin() //新增
  ],


  // 4.文件路径优化
  resolve: {
    alias: {
      pages: path.join(__dirname, 'src/pages'),
      component: path.join(__dirname, 'src/component'),
      router: path.join(__dirname, 'src/router')
    }
  }
}