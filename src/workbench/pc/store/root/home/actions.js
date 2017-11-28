import { createActions } from '@u';
import types from './types';
import { getUserInfo, getWorkList,setCutUser } from './api';

const {
  GET_USER_INFO,
  GET_WORK_LIST,
  CHANGE_USER_INFO_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
  SET_CUT_USER,
} = types;

export default createActions(
  {
    namespace: 'home',
  },
  {
    [GET_USER_INFO]: getUserInfo,
    [GET_WORK_LIST]: getWorkList,
    [SET_CUT_USER]: setCutUser,
  },
  CHANGE_USER_INFO_DISPLAY,
  HIDE_USER_INFO_DISPLAY,
  OPEN_FOLDER,
  CLOSE_FOLDER,
);
