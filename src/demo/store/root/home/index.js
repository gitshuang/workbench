import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getUserInfo,
  getWidgetList,
  changeUserInfoDisplay,
  hideUserInfoDisplay,
} = actions;

const defaultState = {
  userInfo: {},
  widgetList: [],
  userInfoDisplay: false,
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
  [changeUserInfoDisplay]: (state) => {
    const newState = {
      ...state,
      userInfoDisplay: !state.userInfoDisplay,
    };
    return newState;
  },
  [hideUserInfoDisplay]: (state) => ({
    ...state,
    userInfoDisplay: false,
  }),
}, defaultState);


export default reducer;
