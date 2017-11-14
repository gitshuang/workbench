import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions';
import actions from './actions';

const {
  setContentSrc,
  getProductInfo,
  getTitleService,
  titleServiceDisplay,
  titleServiceHidden,
  pinDisplayBlock,
  pinDisplayNone,
} = actions;

const defaultState = {
  contentSrc: '',
  productInfo: '',
  titleServiceList: [],
  titleServiceType: false,
  pinType: false,
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
  [getTitleService]: (state, { payload: titleServiceList, error }) => {
    if (error) {
      return state;
    }
    return {
      ...state,
      titleServiceList,
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
  [pinDisplayBlock]: state => ({
    ...state,
    pinType: true,
  }),
  [pinDisplayNone]: state => ({
    ...state,
    pinType: false,
  }),
}, defaultState);

export default reducer;
