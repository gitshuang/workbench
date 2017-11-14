import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setContentSrc,
  getProductInfo,
  getTitleService,
  titleServiceDisplay,
  titleServiceHidden
} = actions;

const defaultState = {
  contentSrc: '',
  titleService:[],
  titleServiceType: false,
};

const reducer = handleActions({
  [setContentSrc]: (state, { payload: contentSrc }) => ({
    ...state,
    contentSrc,
  }),
  [getProductInfo]: (state, { payload: productInfo, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      productInfo,
    };
  },
  [getTitleService]: (state, { payload: titleService, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      titleService,
    };
  },
  [titleServiceDisplay]: state => ({
    ...state,
    titleServiceType: true,
  }),
  [titleServiceHidden]: state => ({
    ...state,
    titleServiceType: false,
  }),
}, defaultState);

export default reducer;
