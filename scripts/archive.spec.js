const archive = require('./archive')('./scripts/mocks');

describe('Archive', () => {
    it('All Posts', done => {
        archive.all().subscribe(
            p => {
                console.log(p);
                done();
            }
        );
    });
});
