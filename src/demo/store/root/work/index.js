import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setContentSrc,
} = actions;

const defaultState = {
  contentSrc: '',
};

const reducer = handleActions({
  [setContentSrc]: (state, { payload: contentSrc }) => ({
    ...state,
    contentSrc,
  }),
}, defaultState);

export default reducer;
