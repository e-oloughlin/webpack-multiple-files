const path = require('path');
const fs = require('fs');
const readDirRecursive = require('recursive-readdir-synchronous');

let files = readDirRecursive('./module', [(file, stats) => {
    // Exclude files here....
}]);

console.log(files);

module.exports = {
    entry: {
        'module/module1/module1': path.resolve(__dirname, 'module/module1/main.js'),
        'module/module2/module2': path.resolve(__dirname, 'module/module2/main.js'),
        'module/module3/module3': path.resolve(__dirname, 'module/module3/main.js')
    },
    output: {
        filename: '[name].bundle.js'
    }
};