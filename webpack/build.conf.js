/* global require */
// Import base conf and modify it to fit the build process.

const webpack = require('webpack');
const conf = require('./base.conf');

conf.devtool = 'source-map';

conf.plugins.push(new webpack.DefinePlugin({ "process.env": { NODE_ENV: JSON.stringify("production") } }));

module.exports = conf;
