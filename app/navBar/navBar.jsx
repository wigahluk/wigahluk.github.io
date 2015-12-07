'use strict';

import React from 'react';
import { Link } from 'react-router';

import './navBar.styl';

class NavBar extends React.Component {
    render() {
        let sections = [
            { url: '/', text: 'wigahluk' },
            //{ url: '/books', text: 'Bookshelf' }, // I'm not sure if I'll keep this section.
            { url: '/about', text: 'About' }
        ];
        let options = sections.map(s => <li key={s.url}><Link to={s.url}>{s.text}</Link></li>);
        return (
            <div className="navbar">
                <ul className="nabbar-list">
                    {options}
                </ul>
            </div>
        );
    }
}

export default NavBar;