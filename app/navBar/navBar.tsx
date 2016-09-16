'use strict';

import * as React from 'react';

import './navBar.styl';
import {ISection} from '../models/section';

const NavBar = (props: { sections: ISection[] }) =>
    <div className="navbar">
        <ul className="nabbar-list">
            {
                props.sections.map(s => <li key={s.url}><a href={'/#' + s.url}>{s.displayText}</a></li>)
            }
        </ul>
    </div>;

export default NavBar;