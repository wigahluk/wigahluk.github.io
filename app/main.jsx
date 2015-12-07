'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory'

import App from './app.jsx';
import Books from './books.jsx';
import About from './about.jsx';
import NoMatch from './noMatch.jsx';
import SinglePost from './posts/singlePost.jsx'

import './main.styl';

// lets remove the ?_k=ckuvup junk in the URL.
// ref: https://github.com/rackt/react-router/blob/master/docs/guides/basics/Histories.md#createhashhistory
let history = createHashHistory({
    queryKey: false
});

const routes = (<Router history={history}>
    <Route path="/" component={App}>
        <Route path="post/:postName" component={SinglePost}/>
        <Route path="about" component={About}/>
        <Route path="*" component={NoMatch}/>
    </Route>
</Router>);

ReactDOM.render(routes, document.getElementById('app'));