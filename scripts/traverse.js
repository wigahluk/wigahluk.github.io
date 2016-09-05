'use strict';

const Hl = require('highland');
const cli = require('./cli');
const fs = require('fs');

function traverseRecursive (path, onFile, done) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const curPath = `${path}/${file}`;
            if (fs.lstatSync(curPath).isDirectory()) {
                traverseRecursive(curPath, onFile);
            } else {
                onFile(curPath);
            }
        });
        if (done) { done(); }
    }
}

function traverse (srcPath) {
    if (!fs.existsSync(srcPath)) {
        return Hl([]);
    }

    return Hl((push, next) => {
        const onFile = path => { push(undefined, path); };
        const done = () => { push(undefined, Hl.nil); };
        traverseRecursive(srcPath, onFile, done);
    });
}

module.exports = traverse;
