import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise-polyfill';
import App from 'pages';
import 'assets/style/base.css';
import 'assets/style/reset.css';
import {ie9} from 'public/ie9.css';
import 'assets/style/animate.css';

if (!window.Promise) {
  window.Promise = Promise;
}
window.React = React;
window.ReactDOM = ReactDOM;
ReactDOM.render(<div className={`${(!!window.ActiveXObject)?ie9:ie9}`}><App /></div>, document.getElementById('root'));
