'use strict';

import React from 'react';

import NabBar from './navBar/navBar.jsx';
import Posts from './posts/posts.jsx';

class App extends React.Component {
    render() {
        return (
            <div>
                <NabBar></NabBar>
                <div className="container-fluid">
                    { this.props.children  || <Posts></Posts>}
                </div>
                <div className="footer"></div>
            </div>
        );
    }
}

export default App;