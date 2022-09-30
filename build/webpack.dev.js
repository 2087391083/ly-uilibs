const webpackCommonConfig = require('./webpack.common')
// 引入配置合并插件
const { merge } = require('webpack-merge')

module.exports = merge(webpackCommonConfig, {
    mode: 'development',
    devServer: {
        hot: true,
        port: 8084,
    },
})
