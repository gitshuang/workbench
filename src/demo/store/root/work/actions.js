import { createActions } from 'redux-actions';
import types from './types';

const {
  SET_CONTENT_SRC,
} = types;

export default createActions({}, SET_CONTENT_SRC, { namespace: 'work' });
