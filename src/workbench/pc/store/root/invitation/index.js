import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getInviteUsersJoinAddress,
  sendMessage,
  getQRCode,
} = actions;

const defaultState = {
  inviteJoinAddress:'',
  QRCode:''
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
  [getInviteUsersJoinAddress]: createReducer('inviteJoinAddress'),
  [sendMessage]: createReducer(),
  [getQRCode] : createReducer('QRCode'),
}, defaultState);


export default reducer;
