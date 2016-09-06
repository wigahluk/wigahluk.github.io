'use strict';

import * as React from 'react';

import {Post} from '../models/post';
import PostView from './postView';

import './posts.styl'

const PostList = (props: { posts: Post[] }) => {
    const ps = props.posts.map(p => <PostView post={p} key={p.path} />);
    return <div className="postList">{ps}</div>;
};

const Posts = (props: { posts: Post[] }) => (<PostList posts={props.posts } />);

export default Posts;