import React from 'react';
import { handleActions } from 'redux-actions';
import Notification from 'bee/notification';
import { destoryLoadingFunc, createLoadingFunc } from 'pub-comp/loading';
import { dispatchMessageTypeHandler } from 'public/regMessageTypeHandler';
import { trigger } from 'public/componentTools';
import Notice from 'components/notice';
import actions from './actions';

import wrap from './wrap';
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
  popMessage,
  changeMessageType,
  showIm,
  hideIm,
  uploadApplication,
  getPoll,
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
} = actions;

const defaultState = {
  userInfo: {}, // userinfo
  showModal: false,   // 统一modal的显隐
  dialogData: {},     // modal 内容
  showFrame: false,   // frame 遮罩层
  frameParam: {},     // 打开frame传递的参数集合
  currLan: 'zh_CN',//当前的语言
  imShowed: false,
  messageType: false,
  messageList: [],
  messageShowNum: 0,
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
    createLoadingFunc({ text: 'Loading..' });
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
      dialogData: {
        type: 'error',
        title: 'Error',
        msg: msg
      },
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
  [uploadApplication]: state => state,
  [getPoll]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    const info = window.diworkContext();
    const { tenantid, userid } = info;
    // 避免localhost环境下一直刷新
    if (payload.tenantId == "tenantid" && payload.userId == "userid") {
      return state;
    }
    if (!payload.tenantId || !tenantid) {
      return state;
    }
    if (payload.tenantId !== tenantid || payload.userId !== userid) {
      window.location.reload();
    }
    return {
      ...state,
    }
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
  [getCurrentNot]: (state, { payload }) => {
    // console.log('payload',payload.langCode)
    return {
      ...state,
      currLan: payload.langCode
    }
  },
  [showDialog]: (state, { payload: dialogData }) => {
    let { type } = dialogData;
    const { title, msg, btn } = dialogData;
    const typeArray = ['warning', 'success', 'error'];
    if (!typeArray.find((ele) => (ele === type))) {
      type = 'success';
    }
    return {
      ...state,
      showModal: true,
      dialogData: {
        type: type || 'success',
        title: title || 'Tips',
        msg: msg,
        btn: btn,
      },
    }
  },
  [closeDialogNew]: (state) => ({ ...state, showModal: false, dialogData: {} }),
  [openFrame]: (state, { payload: param }) => {
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
}, defaultState);

export default function (state, action) {
  const rootState = reducer(state, action);
  const pageState = {
    wrap: wrap(state ? state.wrap : undefined, action),
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
