const path = require('path');
const pwd = process.cwd();

const webpack = require('webpack');
const Visualizer = require('webpack-visualizer-plugin');

const nodeModulesPath = path.resolve(pwd, 'node_modules');

const config = {
    entry: './app/main.tsx',
    devtool: "source-map",
    output: {
        filename: './bundle.js',
        path: path.resolve(pwd, './build')
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: [nodeModulesPath] },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.md$/, loader: 'post-loader' },
            { test: /wigahluk.json$/, loader: 'wigahluk-loader' },
            { test: /.json$/, loader: 'json-loader' },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    resolveLoader: {
        alias: {
            "wigahluk-loader": path.join(pwd, "./webpack/wigahluk-loader.js"),
            "post-loader": path.join(pwd, "./webpack/post-loader.js")
        }
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ minimize: true }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            minimize: true,
            output: { comments: false }
        }),
        new Visualizer({
            filename: './statistics.html'
        })
    ],
    externals: { react: 'React', 'react-dom': 'ReactDOM' }
};

module.exports = config;