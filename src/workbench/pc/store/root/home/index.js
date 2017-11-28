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
  setCutUser
} = actions;

const defaultState = {
  userInfo: {},
  workList: [],
  userInfoDisplay: false,
  curDisplayFolder: {
    widgetName: '',
    children: [],
  },
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
  [setCutUser]: createReducer('setCutUser'),
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
    folderModalDisplay: false,
  }),
}, defaultState);


export default reducer;
