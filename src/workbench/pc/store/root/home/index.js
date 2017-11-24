import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getUserInfo,
  getWorkList,
  changeUserInfoDisplay,
  hideUserInfoDisplay,
  openFolder,
  closeFolder,
} = actions;

const defaultState = {
  userInfo: {},
  workList: [],
  userInfoDisplay: false,
  curDisplayFolder: {},
  folderModalDisplay: false,
};

const createReducer = (key) => (state, { payload, error }) => {
  if (error) {
    return state;
  } else {
    return {
      ...state,
      [key]: payload,
    };
  }
};

const reducer = handleActions({
  [getUserInfo]: createReducer('userInfo'),
  [getWorkList]: createReducer('workList'),
  [changeUserInfoDisplay]: (state) => ({
    ...state,
    userInfoDisplay: true,
  }),
  [hideUserInfoDisplay]: (state) => ({
    ...state,
    userInfoDisplay: false,
  }),
  [openFolder]: (state, { payload: curDisplayFolder }) => ({
    ...state,
    curDisplayFolder,
    folderModalDisplay: true,
  }),
  [closeFolder]: (state) => ({
    ...state,
    curDisplayFolder: {},
    folderModalDisplay: false,
  }),
}, defaultState);


export default reducer;
