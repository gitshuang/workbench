import { createActions } from '@u';
import types from './types';
import { getAllMenuList } from './api';

const {
  GET_ALL_MENU_LIST,
} = types;

export default createActions(
  {
    namespace: 'menubar',
  },
  {
    [GET_ALL_MENU_LIST]: getAllMenuList,
  },
);
