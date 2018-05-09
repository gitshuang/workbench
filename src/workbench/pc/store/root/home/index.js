import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getUserInfo,
  getEnterInfo,
  getWorkList,
  changeUserInfoDisplay,
  hideUserInfoDisplay,
  changeRequestDisplay,
  closeRequestDisplay,
  openFolder,
  closeFolder,
  setCutUser,
  getSearchEnterList,
  setCreateEnter,
  getSearchEnterOrTeam,
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
  enterList: [],
  searchEnterOrTeamList: [],
};

const createReducer = key => (state, { payload, error }) => {
  if (error) {
    return state;
  }
  return {
    ...state,
    [key]: payload,
  };
};

const reducer = handleActions({
  [getUserInfo]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    payload.allowTenants.forEach((da) => {
      da.type = da.team;// 需求变更，废弃team字段。
    });
    return {
      ...state,
      userInfo: payload,
    };
  },
  [getEnterInfo]: createReducer('enterInfo'),
  [getWorkList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    let { metaData } = payload;
    if (typeof metaData === 'string') {
      metaData = JSON.parse(payload.metaData);
    }
    return {
      ...state,
      workList: payload.workList,
      metaData,
    };
  },
  [getSearchEnterOrTeam]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      searchEnterOrTeamList: payload,
    };
  },
  [setCutUser]: createReducer('setCutUser'),
  [changeUserInfoDisplay]: state => ({
    ...state,
    userInfoDisplay: true,
  }),
  [changeRequestDisplay]: state => ({
    ...state,
    requestDisplay: true,
  }),
  [closeRequestDisplay]: state => ({
    ...state,
    requestDisplay: false,
  }),
  [hideUserInfoDisplay]: state => ({
    ...state,
    userInfoDisplay: false,
    requestDisplay: false,
  }),
  [openFolder]: (state, { payload: curDisplayFolder }) => ({
    ...state,
    curDisplayFolder,
    folderModalDisplay: true,
  }),
  [closeFolder]: state => ({
    ...state,
    folderModalDisplay: false,
  }),
  [getSearchEnterList]: (state, { payload }) => ({
    ...state,
    enterList: payload,
  }),
  [setCreateEnter]: state => ({
    ...state,
  }),
}, defaultState);

export default reducer;
