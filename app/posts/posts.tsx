'use strict';

import * as React from 'react';
import {Observable} from 'rxjs';

import {Post} from '../models/post';
import PostView from './postView';

import './posts.styl'

const Loading = () => (<div>Loading...</div>);

const PostList = (props: { posts: Post[] }) => {
    const posts = props.posts;
    if (posts.length === 0) {
        return (<Loading />);
    } else {
        const ps = posts.map(p => <PostView post={p} key={p.name} />);
        return <div className="postList">{ps}</div>;
    }
};

interface PostsState { posts: Post[] }

class Posts extends React.Component<{}, PostsState> {
    constructor() {
        super();
        this.state = {
            posts: []
        };

        Observable
            .fromPromise(fetch('build/filelist.json'))
            .flatMap( p => p.json())
            .subscribe(
            x => this.setState({posts: x}),
            e => console.log('onError: %s', e)
        );
    }

    render() {
        return (<PostList posts={this.state.posts} />);
    }
}

export default Posts;