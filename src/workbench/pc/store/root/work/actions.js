import { createActions } from 'redux-actions';
import types from './types';
import {
  getProductInfo,
  getTitleService,
  setPinCancel,
  setPinAdd,
  setAddGroup,
  getPinGroup,
} from './api';

const {
  SET_MENUS,
  SET_CURRENT,
  SET_EXPANDED_SIDEBAR,
  DEL_TAB,
  GET_PRODUCT_INFO,
  GET_TITLE_SERVICE,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
  PIN_DISPLAY_BLOCK,
  PIN_DISPLAY_NONE,
  SET_PIN_ADD,
  SET_ADD_GROUP,
  GET_PIN_GROUP,
  SET_PIN_CANCEL,
  ADD_BRM,
  RETURN_DEFAULT_STATE
} = types;

export default createActions({
    [GET_PRODUCT_INFO]: getProductInfo,
    [GET_TITLE_SERVICE]: getTitleService,
    [SET_PIN_ADD]: setPinAdd,
    [SET_ADD_GROUP]: setAddGroup,
    [SET_PIN_CANCEL]: setPinCancel,
    [GET_PIN_GROUP]: getPinGroup,
  },
  SET_MENUS,
  SET_CURRENT,
  SET_EXPANDED_SIDEBAR,
  DEL_TAB,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
  PIN_DISPLAY_BLOCK,
  PIN_DISPLAY_NONE,
  ADD_BRM,
  RETURN_DEFAULT_STATE,
  { namespace: 'work' }
);
