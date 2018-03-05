import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Promise from 'promise-polyfill';
import App from 'pages';
import { IS_IE } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import 'assets/style/base.css';
import 'assets/style/reset.css';
import 'assets/style/ie9.css';
import 'assets/style/animate.css';

if (!window.Promise) {
  window.Promise = Promise;
}
window.React = React;
window.ReactDOM = ReactDOM;
const rootElm = document.getElementById('root');
rootElm.addEventListener('mousedown', () => {
  dispatchMessageTypeHandler({
    type: 'hideIm',
  });
})
ReactDOM.render(<div className={`${IS_IE ? 'ie9' : ''}`}><App /></div>, rootElm);
