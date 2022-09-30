const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (dir) => {
    return path.join(__dirname, dir)
}

function tsLoader() {
    return {
        loader: require.resolve('ts-loader'),
        options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
            configFile: path.join(__dirname, 'tsconfig.json'),
        },
    }
}

module.exports = {
    mode: 'production', //'development',
    entry: './packages/index.ts', //'./examples/main.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js', //'main.js',
    },
    module: {
        rules: [
            {
                test: /\.(m|c)?jsx?$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'packages'),
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
                include: path.resolve(__dirname, 'packages'),
            },
            {
                test: /\.s[ca]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                // exclude: /node_modules/,
                include: path.resolve(__dirname, 'packages'),
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // exclude: /node_modules/,
                include: path.resolve(__dirname, 'packages'),
            },
            {
                test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'img/[name].[ext]',
                },
                include: path.resolve(__dirname, 'packages'),
            },
            {
                test: /\.(svg)(\?.*)?$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[ext]',
                },
                include: path.resolve(__dirname, 'packages'),
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                type: 'asset',
                generator: {
                    filename: 'media/[name].[ext]',
                },
                include: path.resolve(__dirname, 'packages'),
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                type: 'asset',
                generator: {
                    filename: 'fonts/[name].[ext]',
                },
                include: path.resolve(__dirname, 'packages'),
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.tsx', '.jsx', '.svg'], // 加入ts 和 tsx
        alias: {
            '@': path.join(__dirname, 'packages'),
        },
    },
    devServer: {
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
            filename: 'index.html',
        }),
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
    ],
}
