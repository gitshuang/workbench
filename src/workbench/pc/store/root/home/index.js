import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getUserInfo,
  getEnterInfo,
  getWorkList,
  changeUserInfoDisplay,
  hideUserInfoDisplay,
  changeRequestDisplay,
  openFolder,
  closeFolder,
  setCutUser,
  getSearchEnterList,
  setCreateEnter
} = actions;

const defaultState = {
  userInfo: {},
  enterInfo: {},
  workList: [],
  metaData: {},
  userInfoDisplay: false,
  requestDisplay: false,
  curDisplayFolder: {
    widgetName: '',
    children: [],
  },
  folderModalDisplay: false,
  enterList:[]
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
  [getEnterInfo]: createReducer('enterInfo'),
  [getWorkList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    let metaData = payload.metaData;
    if(typeof metaData == "string"){
      metaData = JSON.parse(payload.metaData)
    }
    return {
      ...state,
      workList: payload.workList,
      metaData: metaData
    };
  },
  [setCutUser]: createReducer('setCutUser'),
  [changeUserInfoDisplay]: (state) => ({
    ...state,
    userInfoDisplay: true,
  }),
  [changeRequestDisplay]: (state) => ({
    ...state,
    requestDisplay: true,
  }),
  [hideUserInfoDisplay]: (state) => ({
    ...state,
    userInfoDisplay: false,
    requestDisplay: false
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
  [getSearchEnterList]: (state, { payload, error }) => {
    return {
      ...state,
      enterList: payload,
    };
  },
  [setCreateEnter]: (state, { payload, error }) => {
    return{
      ...state,
    }
  },
}, defaultState);

export default reducer;
