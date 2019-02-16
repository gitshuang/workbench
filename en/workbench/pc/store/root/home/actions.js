import { createActions } from '@u';
import types from './types';
import {  getEnterInfo, getWorkList, 
  setCreateEnter, getApplicationList,
  clearApplicationTips,
} from './api';

const {
  GET_ENTER_INFO,
  GET_WORK_LIST,
  CHANGE_REQUEST_DISPLAY,
  CLOSE_REQUEST_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
  SET_CREATE_ENTER,
  GET_APPLICATION_LIST,
  CLEAR_APPLICATION_TIPS,
} = types;

export default createActions(
  {
    namespace: 'home',
  },
  {
    [GET_ENTER_INFO]: getEnterInfo,
    [GET_WORK_LIST]: getWorkList,
    [SET_CREATE_ENTER]: setCreateEnter,
    [GET_APPLICATION_LIST]: getApplicationList,
    [CLEAR_APPLICATION_TIPS]:clearApplicationTips,
  },
  CHANGE_REQUEST_DISPLAY,
  CLOSE_REQUEST_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
);
