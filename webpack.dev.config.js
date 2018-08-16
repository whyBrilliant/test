const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 1.写好入口和输出，以及需要解析的js
  // entry: [
  //   path.join(__dirname, 'src/index.js')
  // ],

  // output: {
  //   path: path.join(__dirname, './dist'),
  //   filename: 'bundle.js'
  // },


  /*src文件夹下面的以.js结尾的文件，要使用babel解析*/
  /*cacheDirectory是用来缓存编译结果，下次编译加速*/
  // module: {
  //   rules: [{
  //     test: /\.js$/,
  //     use: ['babel-loader?cacheDirectory=true'],
  //     include: path.join(__dirname, 'src')
  //   }]
  // },


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
  // 然后在入口处判断module.hot

  // 方式二：如下两处 新增 而不使用 --hot参数

  // entry: [
  //   'react-hot-loader/patch', // 热模块替换时引入
  //   path.join(__dirname, 'src/index.js')
  // ],

  devServer: {
    contentBase: path.join(__dirname, './dist'),
    historyApiFallback: true,
    hot: true //新增
  },
  // plugins: [
  //   new HtmlWebpackPlugin(
  //     {
  //       filename: 'index.html',
  //       template: path.join(__dirname, 'src/index.html')
  //     }
  //   ),
  //   new webpack.HotModuleReplacementPlugin() //新增
  // ],


  // 4.文件路径优化
  resolve: {
    alias: {
      pages: path.join(__dirname, 'src/pages'),
      component: path.join(__dirname, 'src/component'),
      router: path.join(__dirname, 'src/router'),
      actions: path.join(__dirname, 'src/redux/actions')
    }
  },

  // 5新增devtool，可以显示代码哪里写错了，并且在浏览器的source选项中查看我们写的代码，也能打断点调试
  devtool: 'inline-source-map',


  // 6编译css
  // npm install css-loader style-loader --save-dev
  // css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能；
  // style-loader将所有的计算后的样式加入页面中； 二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
  // Windows使用node-sass，需要先安装 Microsoft Windows SDK for Windows 7 and .NET Framework 4。

  // npm install --save-dev url-loader file-loader
  // options limit 8192意思是，小于等于8K的图片会被转成base64编码，直接插入HTML中，减少HTTP请求。
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }]
  },


  // 7.优化加载改造路由器之后，打开浏览器，看是不是进入新的页面，都会加载自己的JS的~，名字都是0.bundle.js这样子的，这分不清楚是哪个页面的js呀
  // 我们修改下webpack.dev.config.js,加个chunkFilename。chunkFilename是除了entry定义的入口js之外的js~
  // output: {
  //   path: path.join(__dirname, './dist'),
  //   filename: 'bundle.js',
  //   chunkFilename: '[name].js'
  // }


  // 8.想象一下这个场景~
  // 我们网站上线了，用户第一次访问首页，下载了home.js，第二次访问又下载了home.js~
  // 这肯定不行呀，所以我们一般都会做一个缓存，用户下载一次home.js后，第二次就不下载了。
  // 有一天，我们更新了home.js，但是用户不知道呀，用户还是使用本地旧的home.js。出问题了
  // 因此我们使用缓存的方式，每次打包都用增加hash~
  // HtmlWebpackPlugin插件会自动把js插入到你的模板index.html里面去。
  // output: {
  //   path: path.join(__dirname, './dist'),
  //   filename: '[name].[hash].js',
  //   chunkFilename: '[name].[chunkhash].js'
  // },


  // 9.原来的bundle.js里面是不是包含了react,redux,react-router等等这些代码？？这些代码基本上不会改变的。但是，他们合并在bundle.js里面，
  // 每次项目发布，重新请求bundle.js的时候，相当于重新请求了react等这些公共库。浪费了~
  // 我们把react这些不会改变的公共库提取出来，用户缓存下来。从此以后，用户再也不用下载这些库了，无论是否发布项目。
  // 因此我们新增了vendor和CommonsChunkPlugin,把react等库生成打包到vendor.hash.js里面去。
  entry: {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, 'src/index.js')
    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']//新增
  },

  // 但是你现在可能发现编译生成的文件app.[hash].js和vendor.[hash].js生成的hash一样的，这里是个问题，因为呀，你每次修改代码,都会导致vendor.[hash].js名字改变，
  // 那我们提取出来的意义也就没了。但是无奈，如果用chunkhash，会报错。和webpack-dev-server --hot不兼容，https://github.com/webpack/webpack-dev-server/issues/377
  // 现在我们在配置开发版配置文件，就向webpack-dev-server妥协，因为我们要用他。问题先放这里，等会我们配置正式版webpack.config.js的时候要解决这个问题。
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[hash].js', //其实文档上写的很清楚，这里应该用chunkhash替换hash
    chunkFilename: '[name].[chunkhash].js'
  },

  plugins: [
    new HtmlWebpackPlugin(
      {
        filename: 'index.html',
        template: path.join(__dirname, 'src/index.html')
      }
    ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }) //新增
  ],
}