import { createActions } from 'redux-actions';
import types from './types';
import {
  setWorkList,
} from './api';

const {
  SET_WORK_LIST,
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
    [SET_WORK_LIST]: setWorkList,
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
  {
    namespace: 'manage'
  },
);
