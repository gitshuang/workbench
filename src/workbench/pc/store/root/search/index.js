import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  getSearchSuggest,
  getSearchMore,
  getSearch,
  getSearchOther,
  setSearchHeadData,
} = actions;

const defaultState = {
  SearchSuggestList:[],
  SearchMoreList:[],
  SearchList:[],
  SearchOtherList:[],
  searchHeadData:{appName:"搜索结果",brm:[{name:"搜索结果"}]}
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
  [setSearchHeadData]:(state,{payload:searchHeadData})=>{
    return{
      ...state,
      searchHeadData
    }
  },
}, defaultState);

export default reducer;
