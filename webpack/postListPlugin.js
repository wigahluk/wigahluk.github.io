'use strict';

var fs = require('fs');
var Rx = require('rx');
var _ = require('lodash');

function PostListPlugin(options) {
    // Setup the plugin instance with options...
}

PostListPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
        // This plugin list all the posts in the posts folder.
        var index = [];
        var context = {
            path: 'posts'
        };

        var readDir = Rx.Observable.fromNodeCallback(fs.readdir);
        readDir(context.path)
            //.flatMap(function(array) { return Rx.Observable.fromArray([].concat(array)); })
            .map(function (array) { return [].concat(array); })
            .forEach(function (files) {
                    //console.log(files);
                    for (var i = 0; i< files.length; i++ ) {
                        // Process each file.
                        var post = processFile(context, files[i], i);
                        if(post) { index.push(post); }
                    }

                    // Sort files accordingly to its birth time.
                    index = _.sortBy(index, function (a) { return -a.date.valueOf(); });

                    // convert the list of files into a string to be stored in a file.
                    var str = JSON.stringify(index) + '\n';

                    // Insert this list into the Webpack build as a new file asset:
                    // This file has to be accessed with a fetch or similar tool.
                    compilation.assets['filelist.json'] = {
                        source: function() {
                            return str;
                        },
                        size: function() {
                            return str.length;
                        }
                    };
                },
                function (error) { console.log('onError: %s', error) },
                function () { callback(); } // completed
            );
    });
};

function processFile(context, file, index) {
    if(!context || !file || file === '.DS_Store') return;

    var fpath = context.path + '/' + file;
    var stats = fs.statSync(fpath);
    var content = fs.readFileSync(fpath, 'utf8');
    var title = file;
    // Ignore empty files
    if(/^\s*$/.test(content)) return;
    // Find titles and remove them form the content
    var matches = /(?:^\s*([^\n]+)\s+=+\n)|(?:^\s*#\s([^\s]+)\n)/.exec(content);
    if(matches.length > 1) {
        title = matches[1];
        content = content.substr(matches[0].length);
    } else {
        title = title.replace(/-/g, ' ');
    }
    if(stats.isFile()) {
        return {
            file: file,
            name: file.substring(0, file.length-3),
            title: title,
            date: stats.birthtime,
            mdate: stats.mtime,
            content: content
        };
    }
}

module.exports = PostListPlugin;