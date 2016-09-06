const blog = require('./blog');
const cli = require('./cli');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const pwd = process.cwd();


const toMD = d => `* [${d.title}](${d.path}) (${moment(d.date).format('YYYY/MM/DD')})`;

const writeReadme = postList => {
    const tPath = path.resolve(pwd, './templates/README.tmd');
    const rPath = path.resolve(pwd, './README.md');

    fs.readFile(tPath, 'utf8', function (err, data) {
        if (err) throw err;
        data = data.replace(/\{\{postList\}\}/g, postList);
        fs.writeFile (rPath, data, function(err) {
            if (err) throw err;
            cli.log('Readme file generated successfully.');
        });
    });
};

blog.posts()
    .toArray(data => {
        const list = data
            .sort((a,b) => b.date.valueOf() - a.date.valueOf())
            .map(toMD).
            join('\n');

        writeReadme(list);
    });


