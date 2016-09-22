'use strict';

import * as React from 'react';

import './navBar.styl';
import {ISection} from '../models/section';
import {navigateTo} from "../router";

const navTo = (href: string) => event => { navigateTo(href) };

const Link = (props: { children: any, href: string }) =>
    <a onClick={navTo(props.href)}>{ props.children }</a>;

export const NavBar = (props: { sections: ISection[] }) =>
    <div className="navbar">
        <ul className="nabbar-list">
            {
                props.sections.map(s => <li key={s.url}><Link href={s.url} children={s.displayText} /></li>)
            }
        </ul>
    </div>;
