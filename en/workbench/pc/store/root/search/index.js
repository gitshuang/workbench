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
  SearchSuggestList: [],
  SearchMoreList: [],
  SearchList: [],
  SearchOtherList: [],
  searchHeadData: { appName: 'NoDictionary', brm: [{ name: 'NoDictionary' }] },
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
  [getSearchSuggest]: createReducer('SearchSuggestList'),
  [getSearchMore]: createReducer('SearchMoreList'),
  [getSearch]: createReducer('SearchList'),
  [getSearchOther]: createReducer('SearchOtherList'),
  [setSearchHeadData]: (state, { payload: searchHeadData }) => ({
    ...state,
    searchHeadData,
  }),
}, defaultState);

export default reducer;
