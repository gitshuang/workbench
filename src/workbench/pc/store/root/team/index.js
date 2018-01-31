import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  uploadApplication,
  creataTeam
} = actions;

const defaultState = {
	teamData : {}
};



const reducer = handleActions({
  // 
  [uploadApplication]: state => state,
  [creataTeam]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      teamData: payload
    };
  },
  
}, defaultState);

export default reducer;
