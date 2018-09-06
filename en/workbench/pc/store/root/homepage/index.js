import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getUserInfo,
} = actions;

const defaultState = {
  userInfo: {},
};

const reducer = handleActions({
  [getUserInfo]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      userInfo: payload,
    };
  },
}, defaultState);

export default reducer;
