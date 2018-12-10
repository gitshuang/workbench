import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getAllApplicationList,
} = actions;

const defaultState = {
  allApplicationList: [],
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
  [getAllApplicationList]: createReducer('allApplicationList'),
}, defaultState);

export default reducer;
