/* global __dirname */
var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'build');
var mainPath = path.resolve(__dirname, 'app', 'main.jsx');

var postListPlugin = require(path.resolve(__dirname, 'webpack', 'postListPlugin.js'));

var config = {
    // Makes sure errors in console map to the correct file
    // and line number
    devtool: 'inline-source-map',
    entry: [
        // For hot style updates
        'webpack/hot/dev-server',

        // The script refreshing the browser on none hot updates
        'webpack-dev-server/client?http://localhost:8080',

        // Our Entry point for our application
        mainPath
    ],

    output: {
        // We need to give Webpack a path. It does not actually need it,
        // because files are kept in memory in webpack-dev-server, but an
        // error will occur if nothing is specified. We use the buildPath
        // as that points to where the files will eventually be bundled
        // in production
        path: buildPath,
        filename: 'bundle.js'
    },

    module: {

        loaders: [

            // Loading JS and JSX with Babel to transpile them into ES5
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: [nodeModulesPath]
            },

            // Load JSON files
            {
                test: /.json$/,
                loader: 'json-loader'
            },

            // Let us also add the style-loader and css-loader, which you can
            // expand with less-loader etc.
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },

            // In case we use Stylus
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }

        ]
    },

    // We have to manually add the Hot Replacement plugin when running
    // from Node
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new postListPlugin(),
        new webpack.ProvidePlugin({
            'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};

module.exports = config;