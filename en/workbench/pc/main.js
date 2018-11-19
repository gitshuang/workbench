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
// function getEnableLangVOs() {
//   return [{"default":false,"dislpayName":"简体中文","enabled":true,"id":"75720032-4698-4ed6-9ae1-2f72201dc06e","langCode":"zh_CN","langSequence":1},
//   {"default":true,"dislpayName":"English","enabled":true,"id":"7761a8d9-2d62-4c1c-ab18-5a84f29afb5d","langCode":"en_US","langSequence":2},
//   {"default":false,"dislpayName":"繁体中文","enabled":true,"id":"8d255f23-83b8-490b-b620-f17dea0ed20f","langCode":"zh_TW","langSequence":3}];
// }
// window.getEnableLangVOs = getEnableLangVOs;
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
