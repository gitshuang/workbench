import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setWorkList,
  addGroup,
  delectGroup,
  renameGroup,
  moveGroup,
  addFolder,
  delectFolder,
  renameFolder,
  addServe,
  delectServe,
  moveServe,
  } = actions;

const defaultState = {
  workList : []
};

const reducer = handleActions({
  [setWorkList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
    };
  },
  [addGroup]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [delectGroup]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [renameGroup]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [moveGroup]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [addFolder]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [delectFolder]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [renameFolder]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [addServe]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [delectServe]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
  [moveServe]: (state, { payload: menus }) => ({
    ...state,
    workList,
  }),
}, defaultState);

export default reducer;
