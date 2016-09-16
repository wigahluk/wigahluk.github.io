const blog = require('../scripts/blog');

module.exports = function(source) {
    // Setting the loader as cacheable.
    this.cacheable && this.cacheable();
    // Preparing loader as async
    const done = this.async();
    const mod = source.replace(/'/g, '\\\'').replace(/\n/g, '\\n');
    done(null, `module.exports = '${mod}';`);

};
