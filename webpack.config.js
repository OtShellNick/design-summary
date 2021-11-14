const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const IsDev = process.env.NODE_ENV === 'development';

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]

    if (IsDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}
const filename = ext => IsDev ? `[name].${ext}` : `[name].[contenthash].${ext}`


const plugins = () => {
    return [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            // favicon: "./src/assets/briefcase.svg"
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, './src/assets/CNAME'),
        //             to: path.resolve(__dirname, './build')
        //         },
        //         {
        //             from: path.resolve(__dirname, './src/assets/robots.txt'),
        //             to: path.resolve(__dirname, './build')
        //         },
        //         {
        //             from: path.resolve(__dirname, './src/assets/briefcase.svg'),
        //             to: path.resolve(__dirname, './build')
        //         },
        //     ]
        // }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
}

const cssLoaders = extra => {
    const loaders = [
        MiniCssExtractPlugin.loader,
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}


module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/app/main.tsx'],
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "[name].bundle.js"
    },
    optimization: {
        runtimeChunk: 'single',
    },
    resolve: {
        extensions: ['.js', '.json', '.png', '.jsx', '.ts', '.tsx', '.scss', '.woff'],
        alias: {
            '@components': path.resolve(__dirname, './src/app/components'),
            '@': path.resolve(__dirname, './src'),
        }
    },
    devServer: {
        port: 4200,
        hot: false,
        static: './build'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                oneOf: [
                    {
                        resourceQuery: /tsx/,
                        use: ['@svgr/webpack'],
                    },
                    {
                        use: 'url-loader'
                    }
                ],
                issuer: /\.[jt]sx?$/,
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[contenthash][ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-typescript')
                    }
                ]
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-react')
                    }
                ]
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-react')
                    },
                    {
                        loader: 'babel-loader',
                        options: babelOptions('@babel/preset-typescript')
                    }
                ]
            },
        ]
    },
    plugins: plugins()
}