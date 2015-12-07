'use strict';

import React from 'react';
import Rx from 'rx';

import Post from './Post.jsx';

import './posts.styl'

class Loading extends React.Component {
    render () { return <div>Loading...</div>; }
}

class PostList extends React.Component {
    render() {
        if (this.props.posts.length === 0) {
            return (<Loading></Loading>);
        } else {
            let posts = this.props.posts.map(p => <Post post={p} key={p.name}></Post>);
            return <div className="postList">{posts}</div>;
        }
    }
}

class Posts extends React.Component {
    constructor() {
        super();
        this.state = {
            posts: []
        };

        Rx.Observable
            .fromPromise(fetch('build/filelist.json'))
            .flatMap( p => p.json())
            .subscribe(
            x => this.setState({posts: x}),
            e => console.log('onError: %s', e)
        );
    }

    render() {
        return (<PostList posts={this.state.posts}></PostList>);
    }
}

export default Posts;