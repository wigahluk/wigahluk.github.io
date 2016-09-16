'use strict';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'es6-shim'

import App from './app';

import {HashListener} from './router'

import './main.styl';

declare const require;
const content = require("./wigahluk.json");

const router = new HashListener(window);
router
    .map(path => <App posts={content.posts} path={path}></App>)
    .subscribe(app => { ReactDOM.render(app, document.getElementById('app')); });