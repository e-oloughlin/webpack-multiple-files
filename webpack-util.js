const path = require('path');
const fs = require('fs');
const _ = require('lodash');

module.exports = {
    /**
     * A trick to return a webpack bundle name for a deep filePath.
     * To explain: a webpack bundle whose entry name contains slashes will be written to disk
     * according to those slashes so you can output to a sub directory of any depth (I think).
     * Eg: 'public/js/module-one/bundle' will be bundled as 'public/js/module-one/bundle.js'
     * @param  {String} filePath    The file path for an entry path
     * @return {String}
     */
    getBundleName(filePath) {
        let parts = filePath.split('/'),
            newParts = _.dropRight(_.slice(parts, parts.indexOf('public')));

        newParts.push('bundle');

        return newParts.join('/');
    },

    /**
     * Returns an array of js files for webpack to process,
     * where the entry file is named 'main.js'
     * @param  {String} basePath    The top level directory containing js modules
     * @return {Array}              An array of javascript file paths
     */
    getEntries(basePath) {
        let modules = fs.readdirSync(basePath);

        let entryFiles = modules.map((dir) => {
            let module = path.resolve(basePath, dir);
            let entry = _.find(fs.readdirSync(module), file => /main\.js/.test(file));

            // if a main.js file exists
            if (!entry) return false;

            return path.resolve(basePath, module, entry);
        });

        return _.keyBy(_.compact(entryFiles), file => this.getBundleName(file));
    }
};