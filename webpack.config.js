'use strict';

// const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
// const copy = require('copy-webpack-plugin');

// const BUILD_DIR = path.resolve(__dirname, 'frontend/dist/js');
// const APP_DIR = path.resolve(__dirname, 'backend/static');

const config = {

    entry: path.join(__dirname, '/frontend/src/app.jsx'),

    output: {
        path: path.join(__dirname, '/frontend/dist/js'),
        filename: 'app.js',
    },

	module: {
        loaders : [

            {
                test: /\.jsx?$/,
                include: path.join(__dirname, '/frontend/src'),
                loader : 'babel-loader',
                query: {
                    presets: ["react",'es2015']
                }
            },

            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader?-url', 'postcss-loader', 'sass-loader']
            },

            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader?-url', 'postcss-loader']
            }

        ]
    },

    // plugins: [
    //     new copy([
    //         {from: './backend/static', to: './frontend/dist/js'},
    //         {from: './frontend/src/assets/', to: './frontend/dist/js/assets/'}
    //     ], {
    //         copyUnmodified: false,
    //         debug: 'debug'
    //     }),

    //     new webpack.optimize.CommonsChunkPlugin({
    //         name: 'vendor',
    //         minChunks: Infinity,
    //         filename: 'vendor.bundle.js'
    //     })
    // ]
    watch: true
};

module.exports = config;
