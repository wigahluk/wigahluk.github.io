const L = require('./lexer');

describe('Lexer Rule', () => {

    it('minimal function declaration', () => {
        const l = L.javascript;
        const ts = l.lex('const f = x => x;');
        expect(ts.length).toBe(11);
    });

    it('inline comment', () => {
        const l = L.javascript;
        const ts = l.lex('// comment\nconst f = x => x;');
        expect(ts.length).toBe(12);
    });

    it('multi line comment', () => {
        const l = L.javascript;
        const ts = l.lex('/*\n comment\n*/\nconst f = x => x;');
        expect(ts.length).toBe(13); // \n after comment counts as an additional space
    });
});