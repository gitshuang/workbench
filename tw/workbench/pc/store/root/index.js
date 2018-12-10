import React from 'react';
import { handleActions } from 'redux-actions';
import Notification from 'bee/notification';
import { destoryLoadingFunc, createLoadingFunc } from 'pub-comp/loading';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import { trigger } from 'public/componentTools';
import Notice from 'components/notice';
import actions from './actions';

import home from './home';
import work from './work';
import search from './search';
import application from './application';
import manage from './manage';
import team from './team';
import teamconfig from './teamconfig';
import homepage from './homepage';

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
          type: 'popMessage',
        });
      },
    });
  }
}

const {
  requestStart,
  requestSuccess,
  requestError,
  getUserInfo,
  setUserInfo,
  getServiceList,
  getMessage,
  popMessage,
  changeMessageType,
  showIm,
  hideIm,
  uploadApplication,
  getPoll,
  getPortal,
  setCurrent,
  getAllEnable,
  getCurrent,
  setCurrentNot,
  getAllEnableNot,
  getCurrentNot,
  showDialog,
  closeDialogNew,
  openFrame,
  closeFrame,

  changeActive,
  addTabs,
  changeTabsRouter,
} = actions;

const defaultState = {
  userInfo: {},
  tabs: [

  ],
  activeCarrier: 'home',
  serviceList: [],
  messageType: false,
  messageList: [],
  messageShowNum: 0,
  imShowed: false,
  portalInfo: {
    openStatus: false,
    portalUrl: ''
  },
  showModal: false,
  dialogType: '',
  dialogTitle: '',
  dialogMsg: '',
  showFrame: false,
  frameParam: {
    
  },
  currLan:'zh_CN',//当前的语言
};

const createReducer = key => (state, { payload, error }) => {
  if (error) {
    return state;
  }
  return {
    ...state,
    [key]: payload,
  };
};
const reducer = handleActions({
  [requestStart](state) {
    createLoadingFunc({ text: '加載中...' });
    return state;
  },
  [requestSuccess](state) {
    destoryLoadingFunc();
    return state;
  },
  [requestError](state, { payload: msg }) {
    destoryLoadingFunc();
    return {
      ...state,
      showModal: true,
      dialogType: 'error',
      dialogTitle: '錯誤',
      dialogMsg: msg
    };
  },
  [getUserInfo]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    payload.allowTenants.forEach((da) => {
      da.type = da.team;// 需求变更，废弃team字段。
    });
    return {
      ...state,
      userInfo: payload,
    };
  },
  [setUserInfo]: (state, { payload, }) => {
    payload.allowTenants.forEach((da) => {
      da.type = da.team;// 需求变更，废弃team字段。
    });
    return {
      ...state,
      userInfo: payload,
    };
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
      for (let i = 0, l = popNums; i < l; i += 1) {
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
    const info = window.diworkContext();
    const { tenantid, userid } = info;
    // 避免localhost环境下一直刷新
    if (payload.tenantId == "tenantid" && payload.userId == "userid" ){
       return state;
    }
    if (!payload.tenantId || !tenantid) {
      return state;
    }
    if (payload.tenantId !== tenantid || payload.userId !== userid) {
      window.location.reload();
    }
    return{
      ...state,
    }
  },
  [getPortal]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      portalInfo: payload,
    };
  },
  [popMessage]: (state) => {
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
  [setCurrent]: state => state,
  [getAllEnable]: state => state,
  [getCurrent]: state => state,
  [setCurrentNot]: state => state,
  [getAllEnableNot]: state => state,
  [getCurrentNot]: (state,{payload}) => {
    // console.log('payload',payload.langCode)
    return {
      ...state,
      currLan:payload.langCode
    }
  },
  [showDialog]: (state, {payload: dialogData}) => {
    let {type} = dialogData;
    const {title, msg} = dialogData;
    const typeArray = ['warning', 'success', 'error'];
    if (!typeArray.find((ele) => (ele === type))) {
      type = 'success';
    }
    return {
      ...state,
      showModal: true,
      dialogType: type || 'success',
      dialogTitle: title || '提示',
      dialogMsg: msg
    }
  },
  [closeDialogNew]: (state) => ({...state, showModal: false}),
  [openFrame]: (state, {payload: param}) => {
    return {
      ...state,
      showFrame: true,
      frameParam: param,
    }
  },
  [closeFrame]: (state) => {
    return {
      ...state,
      showFrame: false,
      frameParam: {}
    }
  },
  [changeActive]: (state, { payload, }) => {
    return {
      ...state,
      activeCarrier: payload,
    };
  },
  [addTabs]: (state, { payload, }) => {
    const { tabs } = state;
    const isF = tabs.find((item) => {
      return item.id === payload.id
    });
    if (isF && tabs.length) {
      return {
        ...state,
        activeCarrier: payload.id
      }
    }
    return {
      ...state,
      tabs: [payload, ...tabs],
      activeCarrier: payload.id
    };
  },
  [changeTabsRouter]: (state, { payload, }) => {
    const { tabs } = state;
    const index = tabs.findIndex((item) => {
      return item.id === payload.id;
    });
    if (index > -1) {
      tabs.splice(index, 1, payload);
    }
    return {
      ...state,
      tabs: [...tabs],
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
    homepage: homepage(state ? state.homepage : undefined, action),
  };
  const newState = Object.assign({}, rootState, pageState);
  return newState;
}
