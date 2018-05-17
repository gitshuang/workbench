import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getInviteUsersJoinAddress,
  sendMessage,
} = actions;

const defaultState = {
  inviteJoinAddress: '',
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
  [getInviteUsersJoinAddress]: createReducer('inviteJoinAddress'),
  [sendMessage]: createReducer(),
}, defaultState);


export default reducer;
