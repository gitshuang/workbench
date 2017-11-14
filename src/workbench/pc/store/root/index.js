import React from 'react';
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { mergeReducers } from '@u';
import { Loading, Notification } from 'tinper-bee';
import home from './home';
import work from './work';
import application from './application';
import actions from './actions';
//import types from './types';
//import Button from 'bee-button';
import Notice from 'components/notice';


const notification = Notification.newInstance({ position: 'bottomRight' });

const {
  requestStart,
  requestSuccess,
  requestError,
  getProductList,
  getServiceList,
  getMessage,
  changeQuickServiceDisplay,
  changeQuickServiceHidden,
} = actions;

const defaultState = {
  productList: [],
  serviceList: [],
  quickServiceDisplay: false,
  quickServiceAnimate: "quickServiceHidden",
};

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
  [getProductList]: (state, { payload: productList, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      productList,
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
  [getMessage]: (state, { payload: message, error }) => {
    if (!error) {
      message.forEach((m) => {
        notification.notice({
          title:m.title,
          content: <Notice data={m}/>,
          color:m.color,
          duration: 9,
          closable: false,

        });
      });
    }
    return state;
  },
  [changeQuickServiceDisplay]: state => {
    const newState = {
      ...state,
      quickServiceDisplay: true,
      quickServiceAnimate: " animated slideInDown"
    };
    if(state.quickServiceAnimate === " animated slideInDown"){
      newState.quickServiceAnimate = " animated slideOutUp";
    }else if(state.quickServiceAnimate === " animated slideOutUp"){
      newState.quickServiceAnimate = " animated slideInDown";
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
      newState.quickServiceAnimate = " animated slideOutUp";
    }
    return newState;
  },
}, defaultState);

export default function (state, action) {
  const rootState = reducer(state, action);
  const pageState = {
    home: home(state ? state.home : undefined, action),
    work: work(state ? state.work : undefined, action),
    application: work(state ? state.application : undefined, action),
  };
  const newState = Object.assign({}, rootState, pageState);
  return newState;
};
