'use strict';

import * as React from 'react';
import './about.styl';
import {MdView} from './posts/postView';

declare const require;

const about = require('../about.md');

export const About = () =>  <div className="aboutBlock"><MdView node={about} /></div>;