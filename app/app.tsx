'use strict';

import * as React from 'react';

import NabBar from './navBar/navBar';
import Posts from './posts/posts';
import {Post} from './models/post';
import {About} from './about';
import {NoMatch} from './noMatch';
import {PostView} from "./posts/postView";


const sections = [
    { url: '/', displayText: 'wigahluk' },
    { url: '/about', displayText: 'About' }
];

const rPost = /^\/post\/([^\/]+)$/;

const routeElement = (posts: Post[], path: string) => {
    if (path === '/') return <Posts posts={ posts } />;
    if (path === '/about') return <About />;
    const ms = rPost.exec(path);
    if (ms) {
        const post =  posts.filter(p => p.fileName === ms[1]);
        if (post && post.length > 0) {
            return <PostView post={post[0]} />;
        }

    }
    return <NoMatch />;
};

const App = (props: { posts: Post[], path: string }) => {
    return (
        <div>
            <NabBar sections={sections} />
            <div className="container-fluid">
                { routeElement(props.posts, props.path) }
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default App;