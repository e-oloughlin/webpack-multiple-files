const webpack = require('webpack');
const path = require('path');
const util = require('./webpack-util');
const _ = require('lodash');
const MinifyPlugin = require("babel-minify-webpack-plugin");

// Modular files
let entry = util.getEntries(path.resolve(__dirname, 'public/js'));

// Add vendor libraries to entry
_.assign(entry, {
    vendor: ['jquery', 'lodash']
});

let config = {
    entry,
    output: {
        filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    cacheDirectory: true
                }
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new MinifyPlugin()
    ]
};

module.exports = config;