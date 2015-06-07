'use strict';

module.exports = function (grunt) {

    grunt.registerTask('list-posts', 'Listing articles.', function () {
        var fs = require('fs');
        var path = 'posts';
        var files = fs.readdirSync(path);
        var index = {};
        for (var i = 0; i< files.length; i++ ) {
            var fpath = path + '/' + files[i];
            var stats = fs.statSync(fpath);
            if(stats.isFile() && files[i] !== '.DS_Store') {
                index[files[i]] = {
                    name: files[i],
                    date: stats.birthtime,
                    mdate: stars.mtime
                };
            }
        }

        var str = JSON.stringify(index) + '\n';
        fs.writeFileSync('dist/pindex.json', str);
    });
};