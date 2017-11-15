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
      userInfoDisplay: "fadeInLeftBig"
    };
    if(state.userInfoDisplay === "fadeInLeftBig"){
      newState.userInfoDisplay = "fadeOutLeftBig";
    }else if(state.userInfoDisplay === "fadeOutLeftBig"){
      newState.userInfoDisplay = "fadeInLeftBig";
    }
    return newState;
  },
  [hideUserInfoDisplay]: (state) => {
    const newState = {
      ...state,
      userInfoDisplay: "userInfohidden"
    };
    if(state.userInfoDisplay !== "userInfohidden"){
      newState.userInfoDisplay = "fadeOutLeftBig";
    }
    return newState;
  },
}, defaultState);


export default reducer;
