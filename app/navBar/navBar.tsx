'use strict';

import * as React from 'react';
import { Link } from 'react-router';

import './navBar.styl';
import {ISection} from '../models/section';

const NavBar = (state: { sections: ISection[] }) => {

    let options = state.sections.map(s => <li key={s.url}><Link to={s.url}>{s.displayText}</Link></li>);

    return (
        <div className="navbar">
            <ul className="nabbar-list">
                {options}
            </ul>
        </div>
    );
};

export default NavBar;