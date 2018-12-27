import { createActions } from '@u';
import types from './types';
import {
  setManageList,
  getManageList,
  getAllServicesByLabelGroup,
} from './api';

const {
  UPDATE_SHADOW_CARD,
  SET_MANAGE_LIST,
  GET_MANAGE_LIST,
  BATCH_DELECT,
  BATCH_MOVE,
  SELECT_GROUP_ACTIONS,
  SELECT_LIST_ACTIONS,
  ADD_GROUP,
  ADD_DESK,
  DELECT_GROUP,
  RENAME_GROUP,
  MOVE_GROUP,
  STICK_GROUP,
  MOVE_TOP_GROUP,
  MOVE_BOTTOM_GROUP,
  SPLIT_FOLDER,
  ADD_SERVICE,
  DELECT_SERVICE,
  MOVE_SERVICE,
  GET_ALL_SERVICES_BY_LABEL_GROUP,
  OPEN_BATCH_MOVE,
  CLOSE_BATCH_MOVE,
  SET_EDIT_STATE,
  SET_CURR_GROUP_INDEX,
  EDIT_TITLE,
  SET_EDITONLY_ID,
  SET_CURRENT_SELECT_WIDGET_MAP,
  RETURN_DEFAULT_STATE,
  SET_DRAG_INPUT_STATE,
  EMPTY_SELECT_GROUP,
} = types;

const actions = createActions(
  {
    namespace: 'manage',
  },
  {
    [SET_MANAGE_LIST]: setManageList,
    [GET_MANAGE_LIST]: getManageList,
    [GET_ALL_SERVICES_BY_LABEL_GROUP]: getAllServicesByLabelGroup,
  },
  UPDATE_SHADOW_CARD,
  BATCH_DELECT,
  ADD_GROUP,
  ADD_DESK,
  DELECT_GROUP,
  BATCH_MOVE,
  SELECT_GROUP_ACTIONS,
  SELECT_LIST_ACTIONS,
  RENAME_GROUP,
  MOVE_GROUP,
  STICK_GROUP,
  MOVE_TOP_GROUP,
  MOVE_BOTTOM_GROUP,
  SPLIT_FOLDER,
  ADD_SERVICE,
  DELECT_SERVICE,
  MOVE_SERVICE,
  OPEN_BATCH_MOVE,
  CLOSE_BATCH_MOVE,
  SET_EDIT_STATE,
  SET_CURR_GROUP_INDEX,
  EDIT_TITLE,
  SET_EDITONLY_ID,
  SET_CURRENT_SELECT_WIDGET_MAP,
  RETURN_DEFAULT_STATE,
  SET_DRAG_INPUT_STATE,
  EMPTY_SELECT_GROUP,
);
export default actions;
