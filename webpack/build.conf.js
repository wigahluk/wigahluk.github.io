/* global require */
// Import base conf and modify it to fit the build process.

const conf = require('./base.conf');

conf.devtool = 'source-map';

module.exports = conf;
