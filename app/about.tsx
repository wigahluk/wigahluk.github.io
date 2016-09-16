'use strict';

import * as React from 'react';
import * as MarkdownIt from 'markdown-it';

import './about.styl';

declare const require;

const text = require('../about.md');


const About = () => {
    const html = { __html: new MarkdownIt().render(text) };
    return (<div className="aboutBlock" dangerouslySetInnerHTML={html}></div>)
};

export default About;