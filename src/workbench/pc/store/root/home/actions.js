import { createActions } from '@u';
import types from './types';
import { getUserInfo, getWorkList,setCutUser,getSearchEnterList,setCreateEnter } from './api';

const {
  GET_USER_INFO,
  GET_WORK_LIST,
  CHANGE_USER_INFO_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
  SET_CUT_USER,
  GET_SEARCH_ENTER_LIST,
  SET_CREATE_ENTER
} = types;

export default createActions(
  {
    namespace: 'home',
  },
  {
    [GET_USER_INFO]: getUserInfo,
    [GET_WORK_LIST]: getWorkList,
    [SET_CUT_USER]: setCutUser,
    [GET_SEARCH_ENTER_LIST]:getSearchEnterList,
    [SET_CREATE_ENTER]:setCreateEnter
  },
  CHANGE_USER_INFO_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
);
