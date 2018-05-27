const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackConfigBase = require('./webpack.config.base.js');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const stylelint = require('stylelint');

// postcss plugins
const postcssImport = require('postcss-import');
const postcssCssnext = require('postcss-cssnext');
const postcssNested = require('postcss-nested');
const postcssRemoveRoot = require('postcss-remove-root');
const postcssResponsiveType = require('postcss-responsive-type');

const writeFilePlugin = require('write-file-webpack-plugin');

module.exports = webpackMerge(webpackConfigBase, {
    mode: 'development',
    devtool: 'eval',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true,
                            camelCase: true,
                            localIdentName: '[local]_[hash:base64:5]'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: 'inline',
                            plugins: () => [
                                postcssImport,
                                // stylelint(),
                                postcssCssnext({
                                    features: {
                                        autoprefixer: {
                                            grid: false
                                        }
                                    }
                                }),
                                postcssResponsiveType,
                                postcssNested,
                                postcssRemoveRoot
                            ]
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        port: 8080,
        open: true,
        progress: false,
        watchOptions: {
            poll: 1000
        },
        stats: {
            children: false
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        writeFilePlugin()
    ]
});
