import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setContentSrc,
  changeTitleServiceDisplay,
} = actions;

const defaultState = {
  contentSrc: '',
  titleServiceDisplay: false,
};

const reducer = handleActions({
  [setContentSrc]: (state, { payload: contentSrc }) => ({
    ...state,
    contentSrc,
  }),
  [changeTitleServiceDisplay]: state => ({
    ...state,
    titleServiceDisplay: !state.titleServiceDisplay,
  }),
}, defaultState);

export default reducer;
