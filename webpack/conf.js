const path = require('path');
const pwd = process.cwd();

// Configuration
const config = {
    entry: './app/main.tsx',
    devtool: "source-map",
    output: {
        filename: './bundle.js',
        path: path.resolve(pwd, './build')
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            { test: /\.md$/, loader: 'post-loader' },
            { test: /wigahluk.json$/, loader: 'wigahluk-loader' },
            { test: /.json$/, loader: 'json-loader' },
            { test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
            { test: /\.css$/, loader: 'style-loader!css-loader'},
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    resolveLoader: {
        alias: {
            "wigahluk-loader": path.join(pwd, "./webpack/wigahluk-loader.js"),
            "post-loader": path.join(pwd, "./webpack/post-loader.js")
        }
    },
    devServer: {
        contentBase: path.resolve(pwd, './no_path'), // Set to no existing path in the project.
        publicPath:'/build/',
        before: (app) => {
            app.get(/^\/styles\//, function(request, response){
                response.sendFile(path.resolve(pwd, request.originalUrl.substring(1)));
            });
            app.get(/^\/img\//, function(request, response){
                response.sendFile(path.resolve(pwd, request.originalUrl.substring(1)));
            });
            app.get('/ico32.png', function(request, response){
                response.sendFile(path.resolve(pwd, 'ico32.png'));
            });
            app.get('/', function(request, response){
                response.sendFile(path.resolve(pwd, 'index.html'));
            });
            app.get(/\.md$/, function(request, response){
                response.sendFile(path.resolve(pwd, 'index.html'));
            });
            app.get(/^\/(?:archive|about)\/?$/, function(request, response){
                response.sendFile(path.resolve(pwd, 'index.html'));
            });
        },
    },
    plugins: [],
    externals: { "react": "React", "react-dom": "ReactDOM" }
};

module.exports = config;