const streamFs = require('./streamFs');
const ml = require('./blogml');
const md = require('markdown-it');
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
    const theContent = parse(rContent);

    return {
        absolutePath: p,
        path: relPath,
        fileName: fileName.substring(0, fileName.length-3),
        title: title,
        date: stats.birthtime,
        rawContent: content,
        content: theContent,
        modifiedAt: stats.mtime
    };
};

const posts = () => streamFs.traverse(postsPath)
    .filter(p => mdExt.test(p)) // Filter files that are MD.
    .map(entryData);

const reduceNodes = (tokens) => {
    const nodes = [];
    const chain = [];
    let current;
    tokens.forEach(t => {
        const type = t.type;
        if (ml.isBranch(type)) {
            if (current) { chain.push(current); }
            current = ml.build(t);
        }
        if (type =='inline') {
            current.bulkAppend(reduceNodes(t.children));
        }
        if (ml.isLeaf(type)) {
            const n = ml.build(t);
            if (!current) { nodes.push(n); }
            else { current.append(n); }
        }
        if (ml.isClose(type)) {
            if (chain.length > 0) {
                const c = current;
                current = chain.pop();
                current.append(c);
            } else {
                nodes.push(current);
                current = undefined;
            }
        }
    });
    return nodes;
};

const findTitle = (nodes) => {
    const n = nodes.find(n => n instanceof ml.Heading);
    return n ? n.rawText() : '';
};

const parse = (data) => {
    const env = {};
    const parser = new md('commonmark');
    const tokens = parser.parse(data, env);
    const nodes = reduceNodes(tokens);
    return {
        title: findTitle(nodes),
        children: nodes
    };
};

module.exports = {
    posts: posts,
    parse: parse
};
