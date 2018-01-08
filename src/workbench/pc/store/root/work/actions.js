import { createActions, findPath } from '@u';
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
  SET_CURRENT,
  SET_EXPANDED_SIDEBAR,
  DEL_TAB,
  GET_PRODUCT_INFO,
  SET_PRODUCT_INFO,
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
  RETURN_DEFAULT_STATE,
  SET_TABS,
  CHANGE_SERVICE,
  UNSHIFT_TAB,
} = types;

const actions = createActions(
  {
    namespace: 'work',
  },
  {
    [GET_PRODUCT_INFO]: (code, type, subcode) => (dispatch, getState) => {
      const {
        setProductInfo,
        setCurrent,
      } = actions;
      return getProductInfo(code, type)
        .then((data) => {
          dispatch(setProductInfo(data));
          if (subcode) {
            dispatch(setCurrent(subcode));
          }
          return {
            payload: data,
          };
        }, (e) => {
          return {
            error: true,
            payload: e,
          };
        })
    },
    [GET_TITLE_SERVICE]: getTitleService,
    [SET_PIN_ADD]: setPinAdd,
    [SET_ADD_GROUP]: setAddGroup,
    [SET_PIN_CANCEL]: setPinCancel,
    [GET_PIN_GROUP]: getPinGroup,
    [DEL_TAB]: (currentId) => (dispatch, getState) => {
      const state = getState();
      const {
        setTabs,
      } = actions;
      const { tabs: oldTabs } = state.work;
      let newCurIndex;
      const newTabs = oldTabs.filter(({ id }, i) => {
        const result = id !== currentId;
        if (!result) {
          newCurIndex = i;
          if (newCurIndex + 1 === oldTabs.length) {
            newCurIndex -= 1;
          }
        }
        return result;
      });
      const { serviceCode } = newTabs[newCurIndex];
      dispatch(setTabs(newTabs));
      return serviceCode;
    },
    [UNSHIFT_TAB]: (serviceCode) => (dispatch, getState) => {
      const state = getState();
      const {
        setTabs,
      } = actions;
      const { tabs: oldTabs, menus } = state.work;
      let index = -1;
      const curTabIndex = oldTabs.findIndex(({ serviceCode: tabServiceCode }, i) => {
        return serviceCode === tabServiceCode;
      });
      const curTab = oldTabs[curTabIndex];
      const other = oldTabs.slice(0, curTabIndex).concat(oldTabs.slice(curTabIndex + 1));
      const newTabs = [curTab].concat(other);
      dispatch(setTabs(newTabs));
    },
    [SET_CURRENT]: (code) => (dispatch, getState) =>{
      const state = getState();
      const {
        changeService,
        getTitleService,
      } = actions;
      dispatch(changeService(code));
      dispatch(getTitleService(code));
    },
  },
  SET_EXPANDED_SIDEBAR,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
  PIN_DISPLAY_BLOCK,
  PIN_DISPLAY_NONE,
  ADD_BRM,
  RETURN_DEFAULT_STATE,
  CHANGE_SERVICE,
  SET_TABS,
  SET_PRODUCT_INFO,
);

export default actions;
