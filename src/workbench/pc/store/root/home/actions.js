import { createActions } from '@u';
import types from './types';
import { getUserInfo, getEnterInfo, getWorkList, setCutUser, getSearchEnterList, setCreateEnter, getSearchEnterOrTeam } from './api';

const {
  GET_USER_INFO,
  GET_ENTER_INFO,
  GET_WORK_LIST,
  CHANGE_USER_INFO_DISPLAY,
  CHANGE_REQUEST_DISPLAY,
  CLOSE_REQUEST_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
  SET_CUT_USER,
  GET_SEARCH_ENTER_LIST,
  SET_CREATE_ENTER,
  GET_SEARCH_ENTER_OR_TEAM,
} = types;

export default createActions(
  {
    namespace: 'home',
  },
  {
    [GET_USER_INFO]: getUserInfo,
    [GET_ENTER_INFO]: getEnterInfo,
    [GET_WORK_LIST]: getWorkList,
    [SET_CUT_USER]: setCutUser,
    [GET_SEARCH_ENTER_LIST]: getSearchEnterList,
    [SET_CREATE_ENTER]: setCreateEnter,
    [GET_SEARCH_ENTER_OR_TEAM]: getSearchEnterOrTeam,
  },
  CHANGE_USER_INFO_DISPLAY,
  CHANGE_REQUEST_DISPLAY,
  CLOSE_REQUEST_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
);
