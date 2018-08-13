import { createActions } from '@u';
import types from './types';
import {
  getServiceList,
  getMessage,
  uploadApplication,
  getPoll,
  getPortal,
  setCurrent,
  getAllEnable,
  getCurrent,
} from './api';

const {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  GET_SERVICE_LIST,
  GET_MESSAGE,
  CHANGE_QUICK_SERVICE_DISPLAY,
  CHANGE_QUICK_SERVICE_HIDDEN,
  POP_MESSAGE,
  CHANGE_MESSAGE_TYPE,
  SHOW_IM,
  HIDE_IM,
  UPLOAD_APPLICATION,
  GET_POLL,
  GET_PORTAL,
  SET_CURRENT,
  GET_ALL_ENABLE,
  GET_CURRENT,
  SHOW_DIALOG,
  CLOSE_DIALOG_NEW
} = types;

export default createActions(
  {
    [GET_SERVICE_LIST]: getServiceList,
    [GET_MESSAGE]: getMessage,
    [UPLOAD_APPLICATION]: uploadApplication,
    [GET_POLL]: getPoll,
    [GET_PORTAL]: getPortal,
    [SET_CURRENT]: setCurrent,
    [GET_ALL_ENABLE]: getAllEnable,
    [GET_CURRENT]: getCurrent,
  },
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  CHANGE_QUICK_SERVICE_DISPLAY,
  CHANGE_QUICK_SERVICE_HIDDEN,
  POP_MESSAGE,
  CHANGE_MESSAGE_TYPE,
  SHOW_IM,
  HIDE_IM,
  SHOW_DIALOG,
  CLOSE_DIALOG_NEW
);