import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
	getAllServesGroup
} = actions;

const defaultState = {
	allServesGroup: {},
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
	[getAllServesGroup]: createReducer('allServesGroup'),
}, defaultState);

export default reducer;
