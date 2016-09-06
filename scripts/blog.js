const traverse = require('./traverse');
const fs = require('fs');
const path = require('path');
const pwd = process.cwd();

const postsPath = path.resolve(pwd, './posts');
const mdExt = /\.md$/;
const mdTitle = /(?:^\s*([^\n]+)\s+=+\n)|(?:^\s*#\s([^\s]+)\n)/;

const splitTitle = (content, fileName) => {
    const matches = mdTitle.exec(content);
    if(matches && matches.length > 1) {
        return {
            title: matches[1],
            content: content.substr(matches[0].length)
        };
    } else {
        return {
            title: fileName.substr(0, fileName.length - 3).replace(/-/g, ' '),
            content: content
        };
    }
};

const entryData = p => {
    const relPath = p.substr(pwd.length + 1);
    const stats = fs.statSync(p);
    const rContent = fs.readFileSync(p, 'utf8');
    const fileName = relPath.substr(relPath.lastIndexOf('/') + 1);
    const {title, content} = splitTitle(rContent, fileName);

    return {
        absolutePath: p,
        path: relPath,
        fileName: fileName.substring(0, fileName.length-3),
        title: title,
        date: stats.birthtime,
        rawContent: content,
        modifiedAt: stats.mtime
    };
};

const posts = () => traverse(postsPath)
    .filter(p => mdExt.test(p)) // Filter files that are MD.
    .map(entryData);

module.exports = {
    posts: posts
};
