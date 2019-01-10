import { createActions } from '@u';
import types from './types';
import {
  getFolders,
  cancelFolders,
  setFolders,
  addFolders,
} from './api';

const {
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
} = types;

export default createActions(
  {
    namespace: 'wrap',
  },
  {
    [GET_FOLDERS]: getFolders,
    [CANCEL_FOLDERS]:cancelFolders,
    [SET_FOLDERS]: setFolders,
    [ADD_FOLDERS]: addFolders,
  },
  OPEN_ROOT,
  SHOW_TABS,
  ADD_TABS,
  DEL_TABS,
  CLOSE_TABS,
  OPEN_PIN,
  CLOSE_PIN,
);
