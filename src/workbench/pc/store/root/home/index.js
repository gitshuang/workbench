import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getUserInfo,
  getWidgetList,
  getWorkList,
  changeUserInfoDisplay,
  hideUserInfoDisplay,
} = actions;

const defaultState = {
  userInfo: {},
  widgetList: [],
  workList: [],
  userInfoDisplay: "userInfohidden",
};

/*
const reducer = handleActions({
  [getUserInfo]: (state, { payload: userInfo, error }) => {
    if (error) {
      return state;
    } else {
      return {
        ...state,
        userInfo,
      };
    }
  },
  [getWidgetList]: (state, { payload: widgetList, error }) => {
    if (error) {
      return state;
    } else {
      return {
        ...state,
        widgetList,
      };
    }
  },
}, defaultState);
*/

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
  [getWidgetList]: createReducer('widgetList'),
  [getWorkList]: createReducer('workList'),
  [changeUserInfoDisplay]: (state) => {
    const newState = {
      ...state,
      userInfoDisplay: " animated fadeInLeft"
    };
    if(state.userInfoDisplay === " animated fadeInLeft"){
      newState.userInfoDisplay = " animated fadeOutLeftBig";
    }else if(state.userInfoDisplay === " animated fadeOutLeftBig"){
      newState.userInfoDisplay = " animated fadeInLeft";
    }
    return newState;
  },
  [hideUserInfoDisplay]: (state) => {
    const newState = {
      ...state,
      userInfoDisplay: "userInfohidden"
    };
    if(state.userInfoDisplay !== "userInfohidden"){
      newState.userInfoDisplay = " animated fadeOutLeftBig";
    }
    return newState;
  },
}, defaultState);


export default reducer;
