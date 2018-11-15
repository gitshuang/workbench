import { createActions } from '@u';
import types from './types';
import { getUserInfo, getEnterInfo, getWorkList, 
  setCreateEnter, getSearchEnterOrTeam, getApplicationList,
  clearApplicationTips,
} from './api';

const {
  GET_USER_INFO,
  SET_USER_INFO,
  GET_ENTER_INFO,
  GET_WORK_LIST,
  CHANGE_REQUEST_DISPLAY,
  CLOSE_REQUEST_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
  SET_CREATE_ENTER,
  GET_SEARCH_ENTER_OR_TEAM,
  GET_APPLICATION_LIST,
  CLEAR_APPLICATION_TIPS,
} = types;

export default createActions(
  {
    namespace: 'home',
  },
  {
    [GET_USER_INFO]: getUserInfo,
    [GET_ENTER_INFO]: getEnterInfo,
    [GET_WORK_LIST]: getWorkList,
    [SET_CREATE_ENTER]: setCreateEnter,
    [GET_SEARCH_ENTER_OR_TEAM]: getSearchEnterOrTeam,
    [GET_APPLICATION_LIST]: getApplicationList,
    [CLEAR_APPLICATION_TIPS]:clearApplicationTips,
  },
  SET_USER_INFO,
  CHANGE_REQUEST_DISPLAY,
  CLOSE_REQUEST_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
);
