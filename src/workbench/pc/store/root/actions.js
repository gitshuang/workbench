import { createActions } from '@u';
import types from './types';
import {
  getServiceList,
  getMessage,
  getLatestAccessList,
  getPromotionServiceList,
  uploadApplication,
  getPoll,
  getPortal,
  setCurrent,
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
  GET_LATEST_ACCESS_LIST,
  GET_PROMOTION_SERVICE_LIST,
  CHANGE_MESSAGE_TYPE,
  SHOW_IM,
  HIDE_IM,
  UPLOAD_APPLICATION,
  GET_POLL,
  GET_PORTAL,
  SET_CURRENT,
} = types;

export default createActions(
  {
    [GET_SERVICE_LIST]: getServiceList,
    [GET_MESSAGE]: getMessage,
    [GET_LATEST_ACCESS_LIST]: getLatestAccessList,
    [GET_PROMOTION_SERVICE_LIST]: getPromotionServiceList,
    [UPLOAD_APPLICATION]: uploadApplication,
    [GET_POLL]: getPoll,
    [GET_PORTAL]: getPortal,
    [SET_CURRENT]: setCurrent,
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
);
