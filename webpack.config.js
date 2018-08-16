// 开发环境(development)和生产环境(production)的构建目标差异很大。在开发环境中，我们需要具有强大的、具有实时重新加载(live reloading)或
// 热模块替换(hot module replacement)能力的 source map 和 localhost server。而在生产环境中，我们的目标则转向于关注更小的 bundle，更轻量的 source map，
// 以及更优化的资源，以改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

// 在webpack.dev.config.js的基础上先做以下几个修改~
// 1.先删除webpack-dev-server相关的东西~
// 2.devtool的值改成cheap-module-source-map
// 3.刚才说的hash改成chunkhash
// 4.在package.json增加打包脚本 "build":"webpack --config webpack.config.js"



const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            path.join(__dirname, 'src/index.js')
        ],
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },
    // output: {
    //     path: path.join(__dirname, './dist'),
    //     filename: '[name].[chunkhash].js',
    //     chunkFilename: '[name].[chunkhash].js'
    // },

    // 4.public path
    // 想象一个场景，我们的静态文件放在了单独的静态服务器上去了，那我们打包的时候，如何让静态文件的链接定位到静态服务器呢？
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/' //新增
    },

    // module: {
    //     rules: [{
    //         test: /\.js$/,
    //         use: ['babel-loader'],
    //         include: path.join(__dirname, 'src')
    //     }, {
    //         test: /\.css$/,
    //         use: ['style-loader', 'css-loader']
    //     }, {
    //         test: /\.(png|jpg|gif)$/,
    //         use: [{
    //             loader: 'url-loader',
    //             options: {
    //                 limit: 8192
    //             }
    //         }]
    //     }]
    // },

    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: path.join(__dirname, 'src/index.html')
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'vendor'
    //     })
    // ],

    // 1.文件压缩
    // webpack使用UglifyJSPlugin来压缩生成的文件。npm i --save-dev uglifyjs-webpack-plugin
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: path.join(__dirname, 'src/index.html')
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'vendor'
    //     }),
    //     new UglifyJSPlugin()//新增
    // ],

    // 2.指定环境
    // 许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。例如，当不处于生产环境中时，
    // 某些 library 为了使调试变得容易，可能会添加额外的日志记录(log)和测试(test)。其实，当使用 process.env.NODE_ENV === 'production' 时，
    // 一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。我们可以使用 webpack 内置的 DefinePlugin 为所有的依赖定义这个变量：

    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: path.join(__dirname, 'src/index.html')
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'vendor'
    //     }),
    //     new UglifyJSPlugin(),
    //     new webpack.DefinePlugin({//新增
    //         'process.env': {
    //             'NODE_ENV': JSON.stringify('production')
    //          }
    //      })
    // ],


    // 3.优化缓存
    // 刚才我们把[name].[hash].js变成[name].[chunkhash].js后，npm run build后，发现app.xxx.js和vendor.xxx.js不一样了哦。
    // 你随便修改代码一处，例如Home.js，随便改变个字，你发现home.xxx.js名字变化的同时，vendor.xxx.js名字也变了。这不行啊。
    // 这和没拆分不是一样一样了吗？我们本意是vendor.xxx.js名字永久不变，一直缓存在用户本地的。官方文档推荐了一个插件HashedModuleIdsPlugin
    // 注意，引入顺序在这里很重要。CommonsChunkPlugin 的 'vendor' 实例，必须在 'runtime' 实例之前引入。
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: path.join(__dirname, 'src/index.html')
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'vendor'
    //     }),
    //     new UglifyJSPlugin(),
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             'NODE_ENV': JSON.stringify('production')
    //         }
    //     }),
    //     new webpack.HashedModuleIdsPlugin(),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'runtime' //新增
    //     })
    // ],

    // 5.打包优化
    // 你现在打开dist，是不是发现好多好多文件，每次打包后的文件在这里混合了？我们希望每次打包前自动清理下dist文件。
    // npm install clean-webpack-plugin --save-dev
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         template: path.join(__dirname, 'src/index.html')
    //     }),
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'vendor'
    //     }),
    //     new UglifyJSPlugin(),
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             'NODE_ENV': JSON.stringify('production')
    //         }
    //     }),
    //     new webpack.HashedModuleIdsPlugin()
    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'runtime'
    //     }),
    //     new CleanWebpackPlugin(['dist'])// 新增
    // ],

    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            component: path.join(__dirname, 'src/component'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers')
        }
    },

    //  6.抽取css
    // 目前我们的css是直接打包进js里面的，我们希望能单独生成css文件。我们使用extract-text-webpack-plugin来实现。
    // npm install --save-dev extract-text-webpack-plugin
    module: {
        rules: [{
            test: /\.js$/,
            use: ['babel-loader'],
            include: path.join(__dirname, 'src')
        }, { // 新增
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
            })
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

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new UglifyJSPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        }),
        new CleanWebpackPlugin(['dist']),
        new ExtractTextPlugin({
            filename: '[name].[contenthash:5].css',
            allChunks: true
        }) // 新增
    ],
};