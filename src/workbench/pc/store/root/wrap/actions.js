import { createActions } from '@u';
import types from './types';
import {
  getServiceList,
  getPortal,
  getFolders,
  cancelFolders,
  setFolders,
  addFolders,
  getAllMenuList,
  getHistoryList,
  delHistory,
  delAllHistory,
} from './api';

const {
  GET_SERVICE_LIST,
  GET_PORTAL,
  OPEN_ROOT,
  SHOW_TABS,
  ADD_TABS,
  DEL_TABS,
  CLOSE_TABS,
  OPEN_PIN,
  CLOSE_PIN,
  GET_FOLDERS,
  CANCEL_FOLDERS,
  SET_FOLDERS,
  ADD_FOLDERS,
  GET_ALL_MENU_LIST,
  GET_HISTORY_LIST,
  DEL_HISTORY,
  DEL_ALL_HISTORY,
} = types;

export default createActions(
  {
    namespace: 'wrap',
  },
  {
    [GET_SERVICE_LIST]: getServiceList,
    [GET_PORTAL]: getPortal,
    [GET_FOLDERS]: getFolders,
    [CANCEL_FOLDERS]:cancelFolders,
    [SET_FOLDERS]: setFolders,
    [ADD_FOLDERS]: addFolders,
    [GET_ALL_MENU_LIST]: getAllMenuList,
    [GET_HISTORY_LIST]: getHistoryList,
    [DEL_HISTORY]: delHistory,
    [DEL_ALL_HISTORY]: delAllHistory,
  },
  OPEN_ROOT,
  SHOW_TABS,
  ADD_TABS,
  DEL_TABS,
  CLOSE_TABS,
  OPEN_PIN,
  CLOSE_PIN,
);
