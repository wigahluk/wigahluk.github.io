const blog = require('../scripts/blog');

module.exports = function(source) {
    // Setting the loader as cacheable.
    this.cacheable && this.cacheable();
    // Preparing loader as async
    const done = this.async();

    blog.posts().toArray(data => {
        data.forEach(p => { this.addDependency(p.absolutePath); });
        const jsonString = JSON.stringify({
            posts: data.sort((a,b) => b.date.valueOf() - a.date.valueOf())
        });
        done(null, `module.exports = ${jsonString};`);
    });
};
