'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import 'es6-shim'

import App from './app';
import About from './about';
import NoMatch from './noMatch';
import SinglePost from './posts/singlePost'

import './main.styl';

declare const require;
const content = require("./wigahluk.json");

const LinkedApp = (props: {children: any}) => <App posts={content.posts} children={props.children}></App>;


const routes = (<Router history={hashHistory}>
    <Route path="/" component={LinkedApp}>
        <Route path="post/:postName" component={SinglePost}/>
        <Route path="about" component={About}/>
        <Route path="*" component={NoMatch}/>
    </Route>
</Router>);

ReactDOM.render(routes, document.getElementById('app'));