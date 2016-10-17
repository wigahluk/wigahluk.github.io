const L = require('./lexer');

describe('Lexer Rule', () => {

    it('Rule that matches return object with rest and token', () => {
        const r = new L.Rule('rule', /^a/);
        const m = r.match('ab');
        expect(m.token.type).toBe('rule');
        expect(m.token.v).toBe('a');
        expect(m.rest).toBe('b');
    });

    it('Rule that doesn\'t matches returns undefined', () => {
        const r = new L.Rule('rule', /^a/);
        const m = r.match('cb');
        expect(m).toBeUndefined();
    });
});

describe('Lexer Rule Collection', () => {

    it('Should return a match on the first rule that matches', () => {
        const rs = new L.Rules({ a: /^a/, b: /^b/ });
        const m = rs.match('ab');
        expect(m.token.type).toBe('a');
        expect(m.token.v).toBe('a');
        expect(m.rest).toBe('b');

        const m2 = rs.match(m.rest);
        expect(m2.token.type).toBe('b');
        expect(m2.token.v).toBe('b');
        expect(m2.rest).toBe('');
    });

    it('Should throw an error if no match', () => {
        const rs = new L.Rules({ a: /^a/, b: /^b/ });
        const mf = () => rs.match('cd');
        expect(mf).toThrow();
    });
});

describe('Lexer', () => {

    it('Simple word space gramar should parse', () => {
        const grammar = {
            space: /^\s+/,
            word: /^[^\s]+/
        };
        const s = 'Hello world';
        const lexer = new L.Lexer(grammar);
        const ts = lexer.lex(s);
        expect(ts.length).toBe(3);
    });
});
