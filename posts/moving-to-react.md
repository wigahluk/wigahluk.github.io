Moving to React and Webpack
===========================

Well, the first thing to say is why. I don't update this blog so often, why don't keep it just like it is? Because I started it as a way to learn, more than a real publishing platform and now I want to have some practice on React (I use Angular at my job).

I like Angular, but React seems to me a more natural approach for building apps. All the idea about directives, controllers and services is good, but not very functional if you think about it. I mean, functional in the terms of functional programming.

React combined with Reactive Extensions seems a more natural environment for functional programming.

Other reasons are:

* I want to use Webpack and its hot loading, ES6 and TypeScript support, as well as its packaging capabilities.
* Configuring Webpack with Angular 1.x is a bit tricky and full of magic. I have a very bad memory and always forget what is happening behind all this magic tools with magic words as "ng-inject" in the middle of the file. This makes me a bit uncomfortable with Angular/Webpack.
* Configuring React with Webpack seems to be a lot more natural. No need for extra tricks. Tests  with Webpack/React seem to be also easier to configure.
* I'm starting some experiments with SVG manipulation and Angular directives cause a lot of console errors when rendering SVGs, something related to the template being loaded before being processed. I don't see that kind of errors in React (probably I'll see others, but till now, all looks good).

## What are the steps to do it?

* Configure Webpack and Webpack server. If possible, I want to avoid creating a full Node.js/Express min app, but I'm thinking it can be needed
* Recreate all my old directives as React components
* Recreate the logic to load the list of posts and covert it into a Webpack loader

I'm thinking that some extra features I can add to this blog can be done as Webpack loaders or npm scripts. Among the things I want to add:

* Tests and tests reports
* Test coverage reports
* Duplicated code reports

Some other nice to have features:

* Sequence diagrams in markdown correctly rendered

### Configure Webpack and Webpack server

As I was thinking, at the end I needed to use a node/express app as my develop entry point.

At my `package.json` I have these scripts:

	"scripts": {
		// For when we need to package the app:
	    "build": "webpack -p",
		// Develop mode will run a node app:
	    "start": "node server.js"
	  }

Then, for the `server.js` file:

	var express = require('express');
	var path = require('path');
	var httpProxy = require('http-proxy');

	var proxy = httpProxy.createProxyServer();
	var app = express();

	var port =  3000;

	// We point our static assets to a dummy folder, so that when requesting for /build/* node doesn't use the built
	// files in the real folder.
	var publicPath = path.resolve(__dirname, 'tmp');
	app.use('/', express.static(publicPath));

	// As we are using a dummy folder as our root, we need to set the path for index.html and other files explicitly.
	// This is a bit of an issue, but I'm not expecting to add many static files anyway.
	app.get('/', function(request, response){
	    response.sendFile(path.resolve(__dirname, 'index.html'));
	});
	app.get('/ico32.png', function(request, response){
	    response.sendFile(path.resolve(__dirname, 'ico32.png'));
	});

	require('./webpack.server.js')();

	// Any requests to localhost:3000/build is proxied
	// to webpack-dev-server
	app.all('/build/*', function (req, res) {
	    proxy.web(req, res, {
	        target: 'http://localhost:8080'
	    });
	});

	// It is important to catch any errors from the proxy or the
	// server will crash. An example of this is connecting to the
	// server when webpack is bundling
	proxy.on('error', function(e) {
	    console.log('Could not connect to proxy, please try again...');
	});

	// And run the server
	app.listen(port, function () {
	    console.log('Node server running at port %s and Webpack Server running at por 8080.', port);
	});

We'll need also a manual setup for Webpack as we are not using the default server:

	var webpack = require('webpack');
	var webpackDevServer = require('webpack-dev-server');
	var webpackConfig = require('./webpack.config.js');

	module.exports = function () {

	    // First we fire up Webpack an pass in the configuration we
	    // created
	    var bundleStart = null;
	    var compiler = webpack(webpackConfig);

	    // We give notice in the terminal when it starts bundling and
	    // set the time it started
	    compiler.plugin('compile', function() {
	        console.log('[Webpack] Bundling...');
	        bundleStart = Date.now();
	    });

	    // We also give notice when it is done compiling, including the
	    // time it took. Nice to have
	    compiler.plugin('done', function() {
	        console.log('[Webpack] Bundled in ' + (Date.now() - bundleStart) + 'ms!');
	    });

	    var bundler = new webpackDevServer(compiler, {

	        // We need to tell Webpack to serve our bundled application
	        // from the build path. When proxying:
	        // http://localhost:3000/build -> http://localhost:8080/build
	        publicPath: '/build/',

	        // Configure hot replacement
	        hot: true,

	        // The rest is terminal configurations
	        quiet: false,
	        noInfo: true,
	        stats: {
	            colors: true
	        }
	    });

	    // We fire up the development server and give notice in the terminal
	    // that we are starting the initial bundle
	    bundler.listen(8080, 'localhost', function () {
	        console.log('[Webpack] Bundling project, please wait...');
	    });

	};

After this, almost everything will work as in any Webpack tutorial.

### Recreate all my old directives as React components

Webpack is running and my app is pretty much broken. I see only a blank page. Now we need to start loading a bunch of things.

In my old *post* directive, I was supporting HTML posts, which I don't really use and can be an issue. I'm not supporting them any more.

Instead of using the jQuery like API to insert the content of my posts after rendering the HTML from the MD files, I'm using the method `dangerouslySetInnerHTML` from React, that makes me think that I should find a cleaner why to solve this need.

	// Angular
	// Somehow you get access to the element object.
	var html = $sanitize(markdown.render(content));
	element.html(html);
	
	// React
	let html = { __html: new MD().render(post.content) };
	// In the virtual DOM
	<div className="postContent" dangerouslySetInnerHTML={html}></div>

Another important thing is that, because I don't have anymore the `$HTTP` object form Angular, now I'm relying on the `fetch` method and its polyfill.

This was pretty easy to use in combination with RxJS:

	Rx.Observable
	.fromPromise(fetch('build/filelist.json'))
	.flatMap( p => p.json());

I moved some of the logic to a Webpack plugin, now I'm generating the list of files and extracting the title in this step, instead of doing extra processing in the browser that was also not the cleanest solution.
