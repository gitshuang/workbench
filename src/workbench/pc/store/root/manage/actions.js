import { createActions } from 'redux-actions';
import types from './types';
import {
  setManageList,
  getManageList
} from './api';

const {
  SET_MANAGE_LIST,
  GET_MANAGE_LIST,
  ADD_GROUP,
  DELECT_GROUP,
  RENAME_GROUP,
  MOVE_GROUP,
  ADD_FOLDER,
  RENAME_FOLDER,
  SPLIT_FOLDER,
  ADD_SERVE,
  DELECT_SERVE,
  MOVE_SERVE,
  } = types;

export default createActions(
  {
    [SET_MANAGE_LIST]: setManageList,
    [GET_MANAGE_LIST]: getManageList,
  },
  ADD_GROUP,
  DELECT_GROUP,
  RENAME_GROUP,
  MOVE_GROUP,
  ADD_FOLDER,
  RENAME_FOLDER,
  SPLIT_FOLDER,
  ADD_SERVE,
  DELECT_SERVE,
  MOVE_SERVE,
);
