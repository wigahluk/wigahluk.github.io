'use strict';

import * as React from 'react';
import {Observable} from 'rxjs';
import * as MarkdownIt from 'markdown-it';

import './about.styl';

interface AboutState { about: string }

class About extends React.Component<{}, AboutState> {
    constructor() {
        super();
        this.state = {
            about: ''
        };

        let postFetch = Observable
            .fromPromise(fetch('/README.md'))
            .flatMap( p => p.text())
            .subscribe(
            x => this.setState({ about: x }),
            e => console.log('onError: %s', e)
        );
    }
    render() {
        const html = { __html: new MarkdownIt().render(this.state.about) };
        return (<div className="aboutBlock" dangerouslySetInnerHTML={html}></div>)
    }
}

export default About;