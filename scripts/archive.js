const fs = require('./streamFs');
const git = require('./git');
const path = require('path');
const pwd = process.cwd();

const relativePath = p => path.resolve(pwd, p).substr(pwd.length + 1);

const fileName = p => {
    const relPath = relativePath(p);
    const fName =  relPath.substr(relPath.lastIndexOf('/') + 1);
    return fName.substring(0, fName.lastIndexOf('.'))
};

const archive = path => ({
    all: () => fs.traverse(path)
        .flatMap(p => fs.readFile(p).map(c => ({path: p, content: c})))
        .flatMap(p => git.created(p.path).map(c => ({path: p.path, content: p.content, date: c})))
    // (p => {
    //     return {
    //         absolutePath: p,
    //         path: relativePath(p),
    //         fileName: fileName(p)
    //     };
    // })
});

module.exports = archive;