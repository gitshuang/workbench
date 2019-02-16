import { createTypes } from '@u';

export default createTypes(
  'REQUEST_START',
  'REQUEST_SUCCESS',
  'REQUEST_ERROR',
  'GET_USER_INFO',
  'SET_USER_INFO',
  'CHANGE_QUICK_SERVICE_DISPLAY',
  'CHANGE_QUICK_SERVICE_HIDDEN',
  'POP_MESSAGE',
  'CHANGE_MESSAGE_TYPE',
  'SHOW_IM',
  'HIDE_IM',
  'UPLOAD_APPLICATION',
  'GET_POLL',
  'SET_CURRENT',
  'GET_ALL_ENABLE',
  'GET_CURRENT',
  'SET_CURRENT_NOT',
  'GET_ALL_ENABLE_NOT',
  'GET_CURRENT_NOT',
  'SHOW_DIALOG',
  'CLOSE_DIALOG_NEW',
  'OPEN_FRAME',
  'CLOSE_FRAME',
  'GET_DEFAULT_DESKTOP',
  'SET_DEFAULT_DESKTOP',
);
