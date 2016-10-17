const jsLex = require('./js-lex');

const forEach = (obj, f) => {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            f(obj[k], k);
        }
    }
};

const toArray = obj => {
    const a = [];
    forEach(obj, (rx, name) => {
        a.push([name, rx]);
    });
    return a;
};

function Rule (name, rx) {
    this.match = s => {
        const match = rx.exec(s);
        if (match) {
            const m = match[0];
            return {
                token: { type: name, v: m },
                rest: s.substr(m.length)
            }
        }
    };
}

function Rules (ruleDefs) {
    const rules = toArray(ruleDefs).map(r => new Rule(r[0], r[1]));
    this.match = s => {
        for (let i = 0; i < rules.length; i++) {
            const m = rules[i].match(s);
            if (m) {
                return m;
            }
        }
        throw Error('Unable to parse: ', s);
    };
}

function Lexer (ruleDefs) {
    const rules = new Rules(ruleDefs);

    this.lex = input => {
        let rest = input;
        const tokens = [];
        while (rest.length > 0) {
            const r = rules.match(rest);
            rest = r.rest;
            tokens.push(r.token);
        }
        return tokens;
    };
}

module.exports = {
    Rule: Rule,
    Rules: Rules,
    Lexer: Lexer,
    javascript: new Lexer(jsLex)
};
