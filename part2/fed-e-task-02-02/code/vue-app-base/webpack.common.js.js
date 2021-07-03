const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


module.exports = {
    entry: './src/main.js',
    // entry: './src/index.js',
    output: {
        filename: 'js/build.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.vue/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                loader: [
                  // compiles Less to CSS
                  "style-loader",
                  "css-loader",
                //   "less-loader",
                ],
            },
            {
                test: /\.(less|css)$/,
                use:[ 'style-loader','css-loader','less-loader'],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024, // 10 KB
                        esModule: false
                    }
                }
            },
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: 'babel-loader',
            //     query: {
            //       presets: ['es2015']
            //     }
            // },
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
            
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Tutorials',
            meta: {
              viewport: 'width=device-width'
            },
            // BASE_URL: './public',
            templateParameters: {
                BASE_URL: '/',
            },
            template: './public/index.html'
          }),

    ]
}