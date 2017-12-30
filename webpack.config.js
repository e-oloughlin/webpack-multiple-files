const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const readDirRecursive = require('recursive-readdir-synchronous');

/**
 * Returns a webpack bundle name for filePath
 * It's a bit of a hack. For a path like: '...module/module1/main.js'
 * it will return 'module/module1/module1'
 * @param  {String} filePath    The file path for an entry path
 * @return {String}
 */
const getBundleName = filePath => {
    let parts = filePath.split('/'),
        dir = parts[parts.length - 3],
        moduleName = parts[parts.length - 2];

    return [dir, moduleName, moduleName].join('/');
}

/**
 * Returns an array of js files for webpack to process
 * @param  {String} basePath    The top level directory containing js modules
 * @return {Array}              An array of javascript file paths
 */
const getEntries = basePath => {
    let modules = fs.readdirSync(basePath);

    let entryFiles = modules.map((dir) => {
        let module = path.resolve(basePath, dir);
        let entry = _.find(fs.readdirSync(module), file => /main\.js/.test(file));

        return path.resolve(basePath, module, entry);
    });

    return _.keyBy(entryFiles, file => getBundleName(file));
};

let config = {
    entry: getEntries(path.resolve(__dirname, 'module')),
    output: {
        filename: '[name].bundle.js'
    }
};

module.exports = config;