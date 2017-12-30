# Webpack multiple entries and outputs

### Problem to solve:
You want one javascript file for each page of a website, containing only the functionality needed for the given page, avoiding unnecessary bloat and slower page loads. Your javascript is organised into multiple directories, each one representing a page or module and you need the final built files to be output in these directories.

[Webpack](https://webpack.js.org/) allows you to specify [multiple entries](https://webpack.js.org/concepts/entry-points/), but only one output can be configured as per [the docs](https://webpack.js.org/concepts/output/):
> Note that, while there can be multiple entry points, only one output configuration is specified.

Additionally, any new module created means a new directory with a new entry point, meaning a modification to the webpack config file is necessary.

### Solution
* Exploit a webpack feature whereby entry names (using the entry [object syntax](https://webpack.js.org/concepts/entry-points/#object-syntax)) are in fact the full file path of the desired output location.
* Write your configuration agnostic of the number of directories or their names so any new directories/modules are automatically processed by webpack.