import { createActions } from 'redux-actions';
import types from './types';
import {
  getUserInfo,
  getWidgetList,
} from './api';

const {
  GET_USER_INFO,
  GET_WIDGET_LIST,
  CHANGE_USER_INFO_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
} = types;

export default createActions(
  {
    [GET_USER_INFO]: getUserInfo,
    [GET_WIDGET_LIST]: getWidgetList,
  },
  CHANGE_USER_INFO_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  { namespace: 'home' },
);
