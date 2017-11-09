import React from 'react';
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import { mergeReducers } from '@u';
import { Loading, Notification } from 'tinper-bee';
import home from './home';
import work from './work';
import actions from './actions';
import types from './types';
import Button from 'bee-button';


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
  changeTitleServiceDisplay,
} = actions;

const defaultState = {
  productList: [],
  serviceList: [],
  quickServiceDisplay: false,
  titleServiceDisplay: false,
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
          content: <div>
            <p>{m.content}</p>
            <Button  className="notifyBtn" size="sm" style={{ position: 'absolute',fontSize: 10,minWidth: 50, right: 15, bottom: 5}}>{m.typeBtn}</Button>
          </div>,

          color:m.color,
          duration: 9,
          closable: false,

        });
      });
    }
    return state;
  },
  [changeQuickServiceDisplay]: state => ({
    ...state,
    quickServiceDisplay: true,
  }),
  [changeQuickServiceHidden]: state => ({
    ...state,
    quickServiceDisplay: false,
  }),
  [changeTitleServiceDisplay]: state => ({
    ...state,
    titleServiceDisplay: !state.titleServiceDisplay,
  }),
}, defaultState);

export default function (state, action) {
  const rootState = reducer(state, action);
  const pageState = {
    home: home(state ? state.home : undefined, action),
    work: work(state ? state.work : undefined, action),
  };
  const newState = Object.assign({}, rootState, pageState);
  return newState;
};
