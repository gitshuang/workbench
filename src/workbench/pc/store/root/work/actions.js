import { createActions } from 'redux-actions';
import types from './types';
import {
  getProductInfo,
  getTitleService,
  setPinCancel
} from './api';

const {
  SET_CONTENT_SRC,
  SET_EXPANDED_SIDEBAR,
  GET_TABS_LIST,
  SET_TABS_CURRENT,
  DEL_TABS,
  GET_PRODUCT_INFO,
  GET_TITLE_SERVICE,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
  PIN_DISPLAY_BLOCK,
  PIN_DISPLAY_NONE,
  PIN_TYPE_FOCUS,
  SET_PIN_CANCEL,
} = types;

export default createActions({
    [GET_PRODUCT_INFO]: getProductInfo,
    [GET_TITLE_SERVICE]: getTitleService,
    [SET_PIN_CANCEL]: setPinCancel,
  },
  SET_CONTENT_SRC,
  SET_EXPANDED_SIDEBAR,
  GET_TABS_LIST,
  SET_TABS_CURRENT,
  DEL_TABS,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
  PIN_DISPLAY_BLOCK,
  PIN_DISPLAY_NONE,
  PIN_TYPE_FOCUS,
  { namespace: 'work' }
);
