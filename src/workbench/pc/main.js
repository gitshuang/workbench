import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise-polyfill';
import App from 'pages';
import 'assets/style/base.css';
import 'public/reset.css';
import 'assets/style/animate.css';

if (!window.Promise) {
  window.Promise = Promise;
}

ReactDOM.render(<App />, document.getElementById('root'));