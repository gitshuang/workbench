import { createActions } from '@u';
import types from './types';
import {
  getSearchSuggest,
  getSearchMore,
  getSearch,
  getSearchOther,
} from './api';

const {
  GET_SEARCH_SUGGEST,
  GET_SEARCH_MORE,
  GET_SEARCH,
  GET_SEARCH_OTHER,
  SET_SEARCH_HEAD_DATA,
} = types;

const actions = createActions(
  {
    namespace: 'search',
  },
  {
    [GET_SEARCH_SUGGEST]: getSearchSuggest,
    [GET_SEARCH_MORE]: getSearchMore,
    [GET_SEARCH]: getSearch,
    [GET_SEARCH_OTHER]: getSearchOther,
  },
  SET_SEARCH_HEAD_DATA,
);

export default actions;
