Writing My own Syntax Coloring Tool
===================================

The problem is quite simple, I want to have colored syntax on the code
 I paste into my posts.

Why not use one of those plugins around the net?

The first reason is that they usually work directly on DOM elements or HTML strings.
You tell them where is you _code_ and what _language_ you use and they
format it replacing your original HTML with another one full of `spans`
 that can be colored with regular CSS.
 
The problem I have is that I don't want to generate HTML as I'm using React who
 is already generated the DOM elements. I want something that I can use in React
 in the most natural possible way.

After looking a bit at the options, I decided to use this as a justification for an exercise
on writing a very naive and simple Lexer.

I'll start with JavaScript, which is the language I write more often:

This is a simple example of JS in a `tab` delimited code block:

    const f = x => x;

And here is the fenced version of it:

```javascript
const f = x => x;
```

The first thing I need is some sort of grammar definition,
my custom solution looks pretty much as other common implementations:

```javascript
const grammar = {
    space: /^\s+/,
    word: /^[^\s]+/
};
```

Where each key represents a _type_ of token and the value is the RegEx
to find them.

Using this grammar to parse `"Hello World"` you should get something like:

```javascript
[
    { "type": "word", "value": "Hello" },
    { "type": "space", "value": " " },
    { "type": "word", "value": "Wolrd" },
]
```

There are really clever ways to do this, but in a naive implementation, 
you can write a function that looks at the start of a line, look for a match
on the set of rules you have, add the found token to your array of tokens
and remove the token substring from the original input:

```javascript
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
```

Then, in _React_, you can write something like:

```javascript
const CodeFenced = (node: IFenced, index: string) => {
    const tokens = jsLexer.lex(node.content);
    const spans = tokens.map((t, idx) => <span className = {t.type} key = {idx}>{t.value}</span>);
    return <pre key = {index} className = "fenced" >
        { spans }
    </pre>;
};
````

And so far that's all. My complete solution for color syntax is about 80 lines of code including
javascript syntax definition.