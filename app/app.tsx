'use strict';

import * as React from 'react';

import {NavBar} from './blogml/navBar';
import {Posts, PostView, MdView} from './blogml/posts';
import {Post} from './models/post';

declare const require;
const about = require('../about.md');

import './about.styl';

const sections = [
    { url: '/', displayText: 'wigahluk' },
    { url: '/about', displayText: 'About' }
];

const rPost = /^\/post\/([^\/]+)$/;

const About = () =>  <div className="aboutBlock"><MdView node={about} /></div>;

const NoMatch = () => (<h1>404!</h1>);

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

export const App = (props: { posts: Post[], path: string }) => {
    return (
        <div>
            <NavBar sections={sections} />
            <div className="container-fluid">
                { routeElement(props.posts, props.path) }
            </div>
            <div className="footer"></div>
        </div>
    );
};
