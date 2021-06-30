// 开发环境配置
const {merge} = require('webpack-merge') 
const common = require('./webpack.common.js.js') // 引入公共模块配置
const webpack = require('webpack') // 引入webpack

module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map', 
    devServer: {
        contentBase: './dist',
        hot: true
    },
    mode: 'development',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})