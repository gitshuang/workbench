import { createActions } from '@u';
import types from './types';
import { getAllApplicationList } from './api';

const {
  GET_ALL_APPLICATION_LIST,
} = types;

export default createActions(
  {
    namespace: 'application',
  },
  {
    [GET_ALL_APPLICATION_LIST]: getAllApplicationList,
  },
);
