'use strict';

import React from 'react';
import Rx from 'rx';

import Post from './Post.jsx';

import './posts.styl'

class Loading extends React.Component {
    render () { return <div>Loading...</div>; }
}

class SinglePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: undefined
        };
        let postName = props.params.postName;

        Rx.Observable
            .fromPromise(fetch('build/filelist.json'))
            .flatMap( p => p.json())
            .flatMap(array => Rx.Observable.fromArray([].concat(array)))
            .filter(e => e.name === postName)
            .subscribe(
            x => this.setState({post: x}),
            e => console.log('onError: %s', e)
        );
    }

    render() {
        let post = this.state.post;
        if (!post) {
            return <Loading></Loading>;
        } else {
            return <Post post={post}></Post>
        }
    }
}

export default SinglePost;