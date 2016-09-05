'use strict';

import * as React from 'react';
import {Observable} from 'rxjs';

import PostView from './postView';
import {Post} from '../models/post';

import './posts.styl'

const Loading = () => (<div>Loading...</div>);

interface SinglePostState { post: Post}

class SinglePost extends React.Component<{}, SinglePostState> {
    constructor(props) {
        super(props);
        this.state = {
            post: undefined
        };
        let postName = props.params.postName;

        Observable
            .fromPromise(fetch('build/filelist.json'))
            .flatMap( p => p.json())
            .flatMap(array => Observable.from([].concat(array)))
            .filter(e => e.name === postName)
            .subscribe(
            x => this.setState({post: x}),
            e => console.log('onError: %s', e)
        );
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