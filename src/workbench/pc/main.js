import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from 'pages';
import { IS_IE } from '@u';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import 'assets/style/reset.css';
import 'assets/style/animate.css';
import 'assets/style/iuapmobile.um.css';
import 'assets/style/base.css';
import 'assets/style/ie9.css';

window.React = React;
window.ReactDOM = ReactDOM;
const rootElm = document.getElementById('root');
rootElm.addEventListener('mousedown', (e) => {
  dispatchMessageTypeHandler({
    type: 'hideIm',
  });
});
ReactDOM.render(<div className={`${IS_IE ? 'ie9' : 'diwork'}`}><App /></div>, rootElm);