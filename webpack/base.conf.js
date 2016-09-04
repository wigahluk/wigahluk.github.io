/* global require */
/* global __dirname */
const webpack = require('webpack');
const path = require('path');
const basePath = process.cwd();
const nodeModulesPath = path.resolve(basePath, 'node_modules');
const buildPath = path.resolve(basePath, 'build');
const entryPath = path.resolve(basePath, 'app', 'main.jsx');

const postListPlugin = require('./postListPlugin');

const config = {
    entry: [ entryPath ],
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: [nodeModulesPath]
            },
            {
                test: /.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    },
    plugins: [
        new postListPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};

module.exports = config;