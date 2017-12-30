const path = require('path');
const util = require('./webpack-util');
const MinifyPlugin = require("babel-minify-webpack-plugin");

let config = {
    entry: util.getEntries(path.resolve(__dirname, 'public/js')),
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
        new MinifyPlugin()
    ]
};

module.exports = config;