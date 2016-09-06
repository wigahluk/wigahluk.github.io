/* global require */
/* global __dirname */
const webpack = require('webpack');
const path = require('path');
const basePath = process.cwd();
const nodeModulesPath = path.resolve(basePath, 'node_modules');
const buildPath = path.resolve(basePath, 'build');
const entryPath = path.resolve(basePath, 'app', 'main.tsx');

const config = {
    entry: [ entryPath ],
    output: {
        path: buildPath,
        filename: 'bundle.js'
    },
    module: {
        // preloaders: [
        //     {
        //         test: /wigahluk.json$/,
        //         loader: 'wigahluk-loader'
        //     }
        // ],
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [nodeModulesPath]
            },
            {
                test: /wigahluk.json$/,
                loader: 'wigahluk-loader'
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
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },
    resolveLoader: {
        alias: {
            "wigahluk-loader": path.join(basePath, "./webpack/wigahluk-loader.js")
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};

module.exports = config;