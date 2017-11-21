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
  [addGroup]: (state, { payload: workList }) => {
    console.log(workList);
    return{
      ...state,
      workList,
    }
  },
  [delectGroup]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
  [renameGroup]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
  [moveGroup]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
  [addFolder]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
  [delectFolder]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
  [renameFolder]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
  [addServe]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
  [delectServe]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
  [moveServe]: (state, { payload: workList }) => ({
    ...state,
    workList,
  }),
}, defaultState);

export default reducer;
