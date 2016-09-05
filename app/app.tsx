'use strict';

import * as React from 'react';

import NabBar from './navBar/navBar';
import Posts from './posts/posts';


const sections = [
    { url: '/', displayText: 'wigahluk' },
    { url: '/about', displayText: 'About' }
];

class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <NabBar sections={sections} />
                <div className="container-fluid">
                    { this.props.children  || <Posts />}
                </div>
                <div className="footer"></div>
            </div>
        );
    }
}

export default App;