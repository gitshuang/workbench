import React from 'react';
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { mergeReducers, logout } from '@u';
import Loading from 'bee/loading';
import Notification from 'bee/notification';
import { openMess } from 'pub-comp/notification';

import Notice from 'components/notice';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import { trigger } from 'public/componentTools';
import home from './home';
import work from './work';
import search from './search';
import application from './application';
import manage from './manage';
import team from './team';
import actions from './actions';
import teamconfig from './teamconfig';
import {destoryLoadingFunc,createLoadingFunc} from 'pub-comp/loading';
const notification = Notification.newInstance({
  position: 'bottomRight',
});
const maxMessageShowNum = 3;
function addMessage(message) {
  if (message) {
    const {
      title,
      color,
    } = message;
    notification.notice({
      title,
      content: <Notice data={message} />,
      color,
      duration: null,
      closable: false,
      onClose: () => {
        dispatchMessageTypeHandler({
          type: 'popMessage'
        });
      }
    });
  }
}

const {
  requestStart,
  requestSuccess,
  requestError,
  getServiceList,
  getMessage,
  changeQuickServiceDisplay,
  changeQuickServiceHidden,
  popMessage,
  getLatestAccessList,
  getPromotionServiceList,
  changeMessageType,
  showIm,
  hideIm,
  uploadApplication,
  getPoll
} = actions;

const defaultState = {
  serviceList: [],
  quickServiceDisplay: false,
  messageType: false,
  messageList:[],
  messageShowNum:0,
  latestAccessList:[],
  promotionServiceList:[],
  imShowed: false,
  isLogout: false
};

const createReducer = (key) => (state, { payload, error }) => {
  if (error) {
    return state;
  } else {
    return {
      ...state,
      [key]: payload,
    };
  }
};
const reducer = handleActions({
  [getLatestAccessList]: createReducer('latestAccessList'),
  [getPromotionServiceList]: createReducer('promotionServiceList'),
  [requestStart](state) {
    // Loading.create();
    createLoadingFunc({text: '正在加载中...'});
    return state;
  },
  [requestSuccess](state) {
    // Loading.destroy();
    destoryLoadingFunc();
    return state;
  },
  [requestError](state, { payload: msg }) {
    // Loading.destroy();
    destoryLoadingFunc();
    openMess({
      title: '错误',
      content: msg,
      type: 'error',
      duration: 4.5,
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
  [uploadApplication]: state => state,
  [getMessage]: (state, { payload: message, error }) => {
    if (error) {
      return state;
    }
    const { messageShowNum, messageList } = state;
    const newMessageList = messageList.concat(message);
    let newMessageShowNum = messageShowNum;
    const popNums = maxMessageShowNum - messageShowNum;
    if (popNums > 0) {
      for (let i = 0, l = popNums; i < l; i++) {
        newMessageShowNum += 1;
        addMessage(newMessageList.shift());
      }
    }

    return {
      ...state,
      messageList: newMessageList,
      messageShowNum: newMessageShowNum,
    };
  },
  [getPoll]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    const { tenantid, userid } = window.diworkContext();
    // if( payload.tenantid !== tenantid || payload.userId !== userid ){
    //   logout();
    // }
    return {
      ...state,
      isLogout: payload,
    };
  },
  [popMessage]: state => {
    const { messageShowNum, messageList } = state;
    const newMessageList = messageList.concat([]);
    let newMessageShowNum = messageShowNum;
    if (messageList.length) {
      setTimeout(() => {
        addMessage(newMessageList.shift());
      }, 300);
    } else {
      newMessageShowNum -= 1;
    }
    return {
      ...state,
      messageList: newMessageList,
      messageShowNum: newMessageShowNum,
    };
  },
  [changeQuickServiceDisplay]: state => ({
    ...state,
    quickServiceDisplay: true,
  }),
  [changeQuickServiceHidden]: state => ({
    ...state,
    quickServiceDisplay: false,
  }),
  [changeMessageType]: (state, { payload: messageType }) => ({
    ...state,
    messageType,
  }),
  [showIm]: (state) => {
    trigger('IM', 'imShow');
    return {
      ...state,
      imShowed: true,
    };
  },
  [hideIm]: (state) => {
    trigger('IM', 'imHide');
    return {
      ...state,
      imShowed: false,
    };
  },
}, defaultState);

export default function (state, action) {
  const rootState = reducer(state, action);
  const pageState = {
    home: home(state ? state.home : undefined, action),
    work: work(state ? state.work : undefined, action),
    search: search(state ? state.search : undefined, action),
    application: application(state ? state.application : undefined, action),
    manage: manage(state ? state.manage : undefined, action),
    team: team(state ? state.team : undefined, action),
    teamconfig: teamconfig(state ? state.teamconfig : undefined, action),
  };
  const newState = Object.assign({}, rootState, pageState);
  return newState;
};
