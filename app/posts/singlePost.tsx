'use strict';

import * as React from 'react';

import PostView from './postView';
import {Post} from '../models/post';

import './posts.styl'

declare const require;
const content = require("../wigahluk.json");

const Loading = () => (<div>Loading...</div>);

interface SinglePostState { post: Post}

class SinglePost extends React.Component<{}, SinglePostState> {
    constructor(props) {
        super(props);
        this.state = {
            post: content.posts.filter(p => p.fileName === props.params.postName)[0]
        };
    }

    render() {
        if (!this.state.post) {
            return <Loading />;
        } else {
            return <PostView post={this.state.post} />
        }
    }
}

export default SinglePost;