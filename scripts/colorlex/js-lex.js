module.exports = {
    comment: /^(?:\/\/[^\n]*\n|\/\*(?:.|\s)*\*\/)/,
    keyword: /^(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)/,
    arrow: /^=>/,
    operator: /^(?:--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3})/,
    boolean: /^(?:true|false)/,
    space: /^\s+/,
    text: /^[^\s]+/
};