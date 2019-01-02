import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getAllMenuList,
} = actions;

const defaultState = {
  allMenuList: [],
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
  [getAllMenuList]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      allMenuList: payload,
    };
  },
}, defaultState);

export default reducer;
