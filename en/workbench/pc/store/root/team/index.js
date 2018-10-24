import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  createTeam,
} = actions;

const defaultState = {
  teamData: {},
};


const reducer = handleActions({
  //
  [createTeam]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      teamData: payload,
    };
  },

}, defaultState);

export default reducer;
