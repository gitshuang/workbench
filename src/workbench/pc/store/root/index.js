import React from 'react';
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { mergeReducers } from '@u';
import { Loading, Notification } from 'tinper-bee';
import home from './home';
import work from './work';
import application from './application';
import manage from './manage';
import actions from './actions';
//import types from './types';
//import Button from 'bee-button';
import Notice from 'components/notice';


const notification = Notification.newInstance({ position: 'bottomRight' });

const {
  requestStart,
  requestSuccess,
  requestError,
  getServiceList,
  getMessage,
  changeQuickServiceDisplay,
  changeQuickServiceHidden,
  pushMessageQueue,
} = actions;

const defaultState = {
  serviceList: [],
  quickServiceDisplay: false,
  quickServiceAnimate: "quickServiceHidden",
  messageList:[]
};

//消息推送
function pushMessageListQueue() {
  let messageNotice = [];
  //typeof window.messageList === "undefined" && (window.messageList = JSON.parse(localStorage.getItem("user_myMessage") || "[]"));

  if(window.messageList.length === 1 && window.remainingNum>0){
    const [first, ...messageTemp] = window.messageList;
    window.remainingNum = (window.remainingNum - 1) < 0 ? 0 : (window.remainingNum - 1);
    messageNotice = [first];
    window.messageList = messageTemp;
  }else if(window.messageList.length===2 && window.remainingNum>0){
    if(window.remainingNum===1){
      const [first, ...messageTemp] = window.messageList;
      window.remainingNum = (window.remainingNum - 1) < 0 ? 0 : (window.remainingNum - 1);
      messageNotice = [first];
      window.messageList = messageTemp;
    }else {
      const [first, second, ...messageTemp] = window.messageList;
      window.remainingNum = (window.remainingNum - 2) < 0 ? 0 : (window.remainingNum - 2);
      messageNotice = [first].concat([second]);
      window.messageList = messageTemp;
      // messageNotice = [...[first],...[second]];
    }
  }else if(window.messageList.length>=3 && window.remainingNum>0){
    if(window.remainingNum===1){
      const [first, ...messageTemp] = window.messageList;
      window.remainingNum = (window.remainingNum - 1) < 0 ? 0 : (window.remainingNum - 1);
      messageNotice = [first];
      window.messageList = messageTemp;
    }else if(window.remainingNum===2){
      const [first, second, ...messageTemp] = window.messageList;
      window.remainingNum = (window.remainingNum - 2) < 0 ? 0 : (window.remainingNum - 2);
      messageNotice = [...[first],...[second]];
      window.messageList = messageTemp;
    }else {
      const [first, second, third, ...messageTemp] = window.messageList;
      window.remainingNum = (window.remainingNum - 3) < 0 ? 0 : (window.remainingNum - 3);
      messageNotice = [first].concat([second]).concat([third]);
      window.messageList = messageTemp;
    }
  }
  //localStorage.setItem('user_myMessage', JSON.stringify(window.messageList));

  if (messageNotice.length>0) {
    messageNotice.forEach((m) => {
      notification.notice({
        title:m.title,
        content: <Notice data={m} />,
        color:m.color,
        duration: null,
        closable: true,
      });
    });
  }
  return messageNotice;
}

const reducer = handleActions({
  [requestStart](state) {
    // Loading.create();
    return state;
  },
  [requestSuccess](state) {
    // Loading.destroy();
    return state;
  },
  [requestError](state, { payload: msg }) {
    // Loading.destroy();
    notification.notice({
      content: msg,
      duration: 6,
      closable: false,
    });
    return state;
  },
  [getServiceList]: (state, { payload: serviceList, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      serviceList,
    };
  },
  [getMessage]: (state, { payload: message, error }) => {
    typeof window.remainingNum === "undefined" && (window.remainingNum = 3); //剩余条数 默认剩余3条
    window.messageList = [...(window.messageList || []), ...message,];
    pushMessageListQueue(); //消息推送
    return state;
  },

  [pushMessageQueue]: state => {
    pushMessageListQueue();
    return state;
  },
  [changeQuickServiceDisplay]: state => {
    const newState = {
      ...state,
      quickServiceDisplay: true,
      quickServiceAnimate: " animated fadeInUp"
    };
    if(state.quickServiceAnimate === " animated fadeInUp"){
      newState.quickServiceAnimate = " animated fadeOutDown";
    }else if(state.quickServiceAnimate === " animated fadeOutDown"){
      newState.quickServiceAnimate = " animated fadeInUp";
    }
    return newState;
  },
  [changeQuickServiceHidden]: state => {
    const newState = {
      ...state,
      quickServiceDisplay: false,
      quickServiceAnimate: "quickServiceHidden"
    };
    if(state.quickServiceAnimate !== "quickServiceHidden"){
      newState.quickServiceAnimate = " animated fadeOutDown";
    }
    return newState;
  },
}, defaultState);

export default function (state, action) {
  const rootState = reducer(state, action);
  const pageState = {
    home: home(state ? state.home : undefined, action),
    work: work(state ? state.work : undefined, action),
    application: application(state ? state.application : undefined, action),
    manage: manage(state ? state.manage : undefined, action),
  };
  const newState = Object.assign({}, rootState, pageState);
  return newState;
};
