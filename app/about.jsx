'use strict';

import React from 'react';
import Rx from 'rx';
import MD from 'markdown-it';

import './about.styl';

class About extends React.Component {
    constructor() {
        super();
        this.state = {
            about: ''
        };

        let postFetch = Rx.Observable
            .fromPromise(fetch('/README.md'))
            .flatMap( p => p.text());
        let subscription = postFetch.subscribe(
            x => this.setState({ about: x }),
            e => console.log('onError: %s', e),
            () => console.log('Articles loaded.')
        );
    }
    render() {
        let html = { __html: new MD().render(this.state.about) };
        return (<div className="aboutBlock" dangerouslySetInnerHTML={html}></div>)
    }
}

export default About;