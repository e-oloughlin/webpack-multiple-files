const path = require('path');
const util = require('./webpack-util');

let config = {
    entry: util.getEntries(path.resolve(__dirname, 'public/js')),
    output: {
        filename: '[name].js'
    }
};

module.exports = config;