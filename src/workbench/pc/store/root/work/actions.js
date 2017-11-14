import { createActions } from 'redux-actions';
import types from './types';

const {
  SET_CONTENT_SRC,
  SET_EXPANDED_SIDEBAR,
  GET_TABS_LIST,
  SET_TABS_CURRENT,
  DEL_TABS,

} = types;

export default createActions(
  {},
  SET_CONTENT_SRC,
  SET_EXPANDED_SIDEBAR,
  GET_TABS_LIST,
  SET_TABS_CURRENT,
  DEL_TABS,
  { namespace: 'work' }
);
