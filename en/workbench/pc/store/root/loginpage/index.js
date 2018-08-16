import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  applyService,
} = actions;

const defaultState = {
};

const createReducer = key => (state, { payload, error }) => {
  if (error) {
    return state;
  }
  return {
    ...state,
  };
};

const reducer = handleActions({
    [applyService]: state => ({
        ...state,
      }),
}, defaultState);

export default reducer;
