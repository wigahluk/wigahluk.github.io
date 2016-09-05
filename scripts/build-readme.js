const traverse = require('./traverse');
const cli = require('./cli');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const pwd = process.cwd();

const fex = /mygithubpage\/.+\.md$/;
const node = /mygithubpage\/node_modules/;
const books = /mygithubpage\/book-listings/;
const rmePath = /mygithubpage\/README.md$/;

const getTitle = (content, fileName) => {
    const matches = /(?:^\s*([^\n]+)\s+=+\n)|(?:^\s*#\s([^\s]+)\n)/.exec(content);
    if(matches && matches.length > 1) {
        return matches[1];
    } else {
        return fileName.substr(0, fileName.length - 3).replace(/-/g, ' ');
    }
};

const entryData = p => {
    const relPath = p.substr(pwd.length + 1);
    const stats = fs.statSync(p);
    const content = fs.readFileSync(p, 'utf8');
    const fileName = relPath.substr(relPath.lastIndexOf('/') + 1);
    const title = getTitle(content, fileName);

    return {
        path: relPath,
        title: title,
        date: stats.birthtime
    };
};

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

traverse(pwd)
    .filter(p => !node.test(p))
    .filter(p => !rmePath.test(p))
    .filter(p => !books.test(p)) // For now I don't want to include books notes as they are out of context
    .filter(p => fex.test(p))
    .map(entryData)
    .toArray(data => {
        const list = data
            .sort((a,b) => b.date.valueOf() - a.date.valueOf())
            .map(toMD).
            join('\n');

        writeReadme(list);
    });


