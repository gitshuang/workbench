import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getSearchSuggest,
  getSearchMore,
  getSearch,
  getSearchOther,
} = actions;

const defaultState = {
  SearchSuggestList:[],
  SearchMoreList:[],
  SearchList:[],
  SearchOtherList:[],
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
	[getSearchSuggest]: createReducer('SearchSuggestList'),
	[getSearchMore]: createReducer('SearchMoreList'),
	[getSearch]: createReducer('SearchList'),
	[getSearchOther]: createReducer('SearchOtherList'),
}, defaultState);

export default reducer;
