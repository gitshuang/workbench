import { createActions } from 'redux-actions';
import types from './types';
import { getUserInfo, getWorkList } from './api';

const {
  GET_USER_INFO,
  GET_WIDGET_LIST,
  GET_WORK_LIST,
  CHANGE_USER_INFO_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
} = types;

export default createActions(
  {
    [GET_USER_INFO]: getUserInfo,
    [GET_WORK_LIST]: getWorkList,
  },
  CHANGE_USER_INFO_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
);
