const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, '../src'),
    entry: [
        './index.js'
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolveLoader: {
        alias: {
            'css-prefix-variables': path.resolve(__dirname, './lib/css-prefix-variables.js')
        }
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: [
                    path.join(process.cwd(), 'node_modules')
                ],
                use: [
                    // 'eslint-loader'
                ]
            },
            {
                enforce: 'pre',
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, '../src')
                ],
                use: [
                    {
                        loader: 'css-prefix-variables',
                        options: {
                            path: path.resolve(__dirname, '../src/commons/styles/variables.css')
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|ogg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../src/assets/index.html'),
            favicon: path.resolve(__dirname, '../src/assets/images/favicon.png')
        })
    ]
};
