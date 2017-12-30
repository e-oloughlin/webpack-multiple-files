const path = require('path');
const util = require('./webpack-util');

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
    }
};

module.exports = config;