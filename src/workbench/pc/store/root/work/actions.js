import { createActions } from 'redux-actions';
import types from './types';

const {
  SET_CONTENT_SRC,
  CHANGE_TITLE_SERVICE_DISPLAY,
} = types;

export default createActions({
  },
  SET_CONTENT_SRC,
  CHANGE_TITLE_SERVICE_DISPLAY,
  { namespace: 'work' });
