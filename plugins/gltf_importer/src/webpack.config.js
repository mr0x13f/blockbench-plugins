const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    target: 'web',
    entry: './plugin/plugin.ts',
    output: {
        path: path.resolve(__dirname, '..'),
        filename: 'joint_pain.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    configFile: path.resolve(__dirname, 'tsconfig.json'),
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    optimizeSSR: false
                },
            },
            {
                test: /\.css$/,
                type: 'asset/source',
            },
            {
                test: /\.glsl$/,
                type: 'asset/source',
            },
            {
                test: /\.py$/,
                type: 'asset/source',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.BannerPlugin({
            banner: '/*! This file was automatically generated using webpack, based on src/plugin */',
            raw: true,
            entryOnly: false,
        }),
    ],
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        beautify: true,
                        indent_level: 4,
                        comments: true,
                    },
                    compress: {
                        drop_console: false,
                        pure_funcs: [],
                        passes: 1,
                    },
                    mangle: false,
                    keep_fnames: true,
                    keep_classnames: true,
                },
                extractComments: false,
            }),
        ],
    },
};
