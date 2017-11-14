import { createActions } from 'redux-actions';
import types from './types';
import {
  getProductList,
  getServiceList,
  getMessage,
} from './api';

const {
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  GET_PRODUCT_LIST,
  GET_SERVICE_LIST,
  GET_MESSAGE,
  CHANGE_QUICK_SERVICE_DISPLAY,
  CHANGE_QUICK_SERVICE_HIDDEN,
} = types;

export default createActions({
    [GET_PRODUCT_LIST]: getProductList,
    [GET_SERVICE_LIST]: getServiceList,
    [GET_MESSAGE]: getMessage,
  },
  REQUEST_START,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  CHANGE_QUICK_SERVICE_DISPLAY,
  CHANGE_QUICK_SERVICE_HIDDEN,
);
