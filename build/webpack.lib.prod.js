const path = require('path')
const { merge } = require('webpack-merge')
const webpackLibBaseConfig = require('./webpack.lib.base')
// 用于提取css到文件中
const miniCssExtractPlugin = require('mini-css-extract-plugin')
// 用于压缩css代码
const optimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')

module.exports = merge(webpackLibBaseConfig, {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        lyUi: path.resolve(__dirname, '../packages/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        // 打包后生成的js文件
        filename: '[name].js',
        publicPath: '/',
        library: 'ly-uilibs',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
    },
    module: {
        rules: [
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    {
                        loader: miniCssExtractPlugin.loader, // 使用miniCssExtractPlugin.loader代替style-loader
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                        // options: {
                        //     implementation: require('dart-sass'),
                        // },
                    },
                    // {
                    //     loader: 'postcss-loader',
                    // },
                ],
            },
        ],
    },
    plugins: [
        // 新建miniCssExtractPlugin实例并配置
        new miniCssExtractPlugin({
            filename: '[name].css',
        }),
        // 压缩css
        new optimizeCssnanoPlugin({
            sourceMap: true,
            cssnanoOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {
                            removeAll: true,
                        },
                    },
                ],
            },
        }),
    ],
})
