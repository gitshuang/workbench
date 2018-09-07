import { createActions } from '@u';
import types from './types';
import { getUserInfo } from './api';

const {
  GET_USER_INFO,
} = types;

export default createActions(
  {
    namespace: 'homepage',
  },
  {
    [GET_USER_INFO]: getUserInfo,
  },
  
);
