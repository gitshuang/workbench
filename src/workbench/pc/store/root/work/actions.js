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
  CHANGE_SERVE,
} = types;

const actions = createActions(
  {
    namespace: 'work',
  },
  {
    [GET_PRODUCT_INFO]: getProductInfo,
    [GET_TITLE_SERVICE]: getTitleService,
    [SET_PIN_ADD]: setPinAdd,
    [SET_ADD_GROUP]: setAddGroup,
    [SET_PIN_CANCEL]: setPinCancel,
    [GET_PIN_GROUP]: getPinGroup,
    [DEL_TAB]: (currentId) => (dispatch, getState) => {
      const state = getState();
      const {
        setTabs,
        setCurrent,
      } = actions;
      const { tabs: oldTabs, menus } = state.work;
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
      const menuItemId = newTabs[newCurIndex].id;
      dispatch(setTabs(newTabs));
      dispatch(setCurrent(menuItemId));
    },
    [SET_CURRENT]: (currentId) => (dispatch, getState) =>{
      const state = getState();
      const {
        changeServe,
        getTitleService,
      } = actions;
      const { menus } = state.work;
      const menuPath = findPath(menus, 'children', 'menuItemId', currentId);
      const current = menuPath.slice(-1)[0];
      const { serveCode } = current;
      dispatch(changeServe({
        currentId,
        current,
        menuPath,
      }));
      dispatch(getTitleService(serveCode));
    },
  },
  SET_EXPANDED_SIDEBAR,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
  PIN_DISPLAY_BLOCK,
  PIN_DISPLAY_NONE,
  ADD_BRM,
  RETURN_DEFAULT_STATE,
  CHANGE_SERVE,
  SET_TABS,
);

export default actions;
