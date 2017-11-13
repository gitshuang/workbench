import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setContentSrc,
  titleServiceDisplay,
  titleServiceHidden
} = actions;

const defaultState = {
  contentSrc: '',
  titleServiceType: false,
};

const reducer = handleActions({
  [setContentSrc]: (state, { payload: contentSrc }) => ({
    ...state,
    contentSrc,
  }),
  [titleServiceDisplay]: state => ({
    ...state,
    titleServiceType: true,
  }),
  [titleServiceHidden]: state => ({
    ...state,
    titleServiceType: false,
  }),
}, defaultState);

export default reducer;
