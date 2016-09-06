'use strict';

import * as React from 'react';

import NabBar from './navBar/navBar';
import Posts from './posts/posts';
import {Post} from './models/post';


const sections = [
    { url: '/', displayText: 'wigahluk' },
    { url: '/about', displayText: 'About' }
];

const App = (props: { posts: Post[], children?: any }) => {
    return (
        <div>
            <NabBar sections={sections} />
            <div className="container-fluid">
                { props.children || <Posts posts={ props.posts } /> }
            </div>
            <div className="footer"></div>
        </div>
    );
};

export default App;