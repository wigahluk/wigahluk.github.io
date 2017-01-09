/* global require */
// Import base conf and modify it to fit the build process.

const webpack = require('webpack');
const conf = require('./base.conf');

conf.devtool = 'source-map';
conf.plugins.push(new webpack.LoaderOptionsPlugin({ minimize: true }));
conf.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    minimize: true,
    output: { comments: false }
}));
conf.plugins.push(new webpack.optimize.DedupePlugin());

module.exports = conf;
