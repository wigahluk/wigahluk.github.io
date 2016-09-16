'use strict';

const cli = require('./cli');
const fs = require('fs');
const rx = require('rxjs');

const readFile = path => rx.Observable.bindNodeCallback(fs.readFile)(path, 'utf8');
const writeFile = (path, data) => rx.Observable.bindNodeCallback(fs.writeFile)(path, data);

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
        return rx.Observable.empty();
    }

    return new rx.Observable(subscriber => {
        const onFile = path => { subscriber.next(path); };
        const done = () => { subscriber.complete(); };
        traverseRecursive(srcPath, onFile, done);
    });
}

module.exports = {
    traverse: traverse,
    readFile: readFile,
    writeFile: writeFile
};
