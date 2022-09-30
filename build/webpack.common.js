const path = require('path')
// 引入htmlWebpackPlugin自动引入js文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入vue-loader插件
const { VueLoaderPlugin } = require('vue-loader')
// 拷贝静态资源
// const CopyWebpackPlugin = require('copy-webpack-plugin')

const resolve = (dir) => {
    return path.join(__dirname, dir)
}

function tsLoader() {
    return {
        loader: require.resolve('ts-loader'),
        options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            configFile: path.join(__dirname, '../tsconfig.json'),
        },
        // {
        //     loader: 'babel-loader',
        //     options: {
        //       // 使用vue官方的懒加载语法并结合babel需使用这个插件，不然会报错
        //       plugins: ['@babel/plugin-syntax-dynamic-import'],
        //     },
        //  },
    }
}

module.exports = {
    // 打包入口
    entry: {
        main: resolve('../examples/main.ts'),
    },
    // webpack打包输出相关的配置
    output: {
        // 打包后输出文件路径
        path: resolve('../dist'),
        // 打包后生成的js文件，带hash值来保证文件的唯一性
        filename: 'js/[name].[hash:4].js',
        // 生成的chunk文件名
        chunkFilename: 'js/[name].[hash:4].js',
        // 资源得引用路径(和打包上线得配置有关)
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{ loader: require.resolve('babel-loader') }],
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'packages'),
                use: [tsLoader()],
            },
            {
                test: /\.tsx?$/,
                use: [{ loader: require.resolve('babel-loader') }, tsLoader()],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ca]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'img/[name].[ext]',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(svg)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[ext]',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'media/[name].[ext]',
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset',
                generator: {
                    filename: 'fonts/[name].[ext]',
                },
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
        }),
        new VueLoaderPlugin(),
        // 拷贝静态资源
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, '../public'),
        //         to: path.resolve(__dirname, '../dist'),
        //     },
        // ]),
    ],
    resolve: {
        alias: {
            eg: path.resolve(__dirname, '../examples'),
            '@': path.resolve(__dirname, '../packages'),
        },
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.jsx', '.svg'], // 加入ts 和 tsx
    },
}
