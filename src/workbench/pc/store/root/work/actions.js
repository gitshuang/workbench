import { createActions } from 'redux-actions';
import types from './types';

const {
  SET_CONTENT_SRC,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
} = types;

export default createActions({
  },
  SET_CONTENT_SRC,
  TITLE_SERVICE_DISPLAY,
  TITLE_SERVICE_HIDDEN,
  { namespace: 'work' });
