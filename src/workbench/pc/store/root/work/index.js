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
  pinTypeFocus,
  setPinCancel,
} = actions;

const defaultState = {
  contentSrc: '',
  productInfo: '',
  titleServiceList: [],
  titleServiceType: false,
  pinType: true,
  pinDisplay: false
};

const reducer = handleActions({
  [setContentSrc]: (state, { payload: contentSrc }) => ({
    ...state,
    contentSrc,
  }),
  [setPinCancel]: (state, { payload, error }) => {
    if (error) {
      return state;
    }
    debugger;
    return {
      ...state,
      pinType: payload,
    };
  },
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
    pinDisplay: true,
  }),
  [pinDisplayNone]: state => ({
    ...state,
    pinDisplay: false,
  }),
  [pinTypeFocus]: state => ({
    ...state,
    pinType: true,
  }),
}, defaultState);

export default reducer;
