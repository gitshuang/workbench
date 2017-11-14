import { createActions } from 'redux-actions';
import types from './types';
import {
  getProductInfo,
  getTitleService,
} from './api';
const {
  SET_CONTENT_SRC,
  GET_PRODUCT_INFO,
  GET_TITLE_SERVICE,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
} = types;

export default createActions({
    [GET_PRODUCT_INFO]: getProductInfo,
    [GET_TITLE_SERVICE]: getTitleService
  },
  SET_CONTENT_SRC,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
  { namespace: 'work' });
