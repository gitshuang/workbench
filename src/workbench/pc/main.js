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
const osFeLoginCallBack = () =>{
  window.location.reload();
}
window.React = React;
window.ReactDOM = ReactDOM;
window.os_fe_loginCallback= osFeLoginCallBack;
const rootElm = document.getElementById('root');
rootElm.addEventListener('mousedown', (e) => {
  dispatchMessageTypeHandler({
    type: 'hideIm',
  });
});
ReactDOM.render(<div className={`${IS_IE ? 'ie9' : 'diwork'}`}><App /></div>, rootElm);