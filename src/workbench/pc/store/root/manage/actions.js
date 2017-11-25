import { createActions } from 'redux-actions';
import types from './types';
import {
  setManageList,
  getManageList
} from './api';

const {
  SET_MANAGE_LIST,
  GET_MANAGE_LIST,
  BATCH_DELECT,
  BATCH_MOVE,
  ADD_GROUP,
  DELECT_GROUP,
  RENAME_GROUP,
  MOVE_GROUP,
  STICK_GROUP,
  ADD_FOLDER,
  SET_FOLDER_EDIT,
  DELETE_FOLDER,
  RENAME_FOLDER,
  SPLIT_FOLDER,
  ADD_SERVE,
  DELECT_SERVE,
  MOVE_SERVE,
  OPEN_FOLDER,
  CLOSE_FOLDER,
  } = types;

export default createActions(
  {
    [SET_MANAGE_LIST]: setManageList,
    [GET_MANAGE_LIST]: getManageList,
  },
  BATCH_DELECT,
  ADD_GROUP,
  DELECT_GROUP,
  BATCH_MOVE,
  RENAME_GROUP,
  MOVE_GROUP,
  STICK_GROUP,
  ADD_FOLDER,
  SET_FOLDER_EDIT,
  DELETE_FOLDER,
  RENAME_FOLDER,
  SPLIT_FOLDER,
  ADD_SERVE,
  DELECT_SERVE,
  MOVE_SERVE,
  OPEN_FOLDER,
  CLOSE_FOLDER,
);
