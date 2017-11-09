import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {

} = actions;

const defaultState = {

};

const reducer = handleActions({

}, defaultState);

export default reducer;
