const path = require('path')
// 引入vue-loader插件
const { VueLoaderPlugin } = require('vue-loader')
// 引入清除打包后文件的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function tsLoader() {
    return {
        loader: require.resolve('ts-loader'),
        options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            configFile: path.join(__dirname, '../tsconfig.json'),
        },
    }
}

module.exports = {
    // 打包组件库时不需要把vue打包进去
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
        },
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
    plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin()],
    resolve: {
        alias: {
            eg: path.resolve(__dirname, '../examples'),
            '@': path.resolve(__dirname, '../packages'),
        },
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.jsx', '.svg'], // 加入ts 和 tsx
    },
}
