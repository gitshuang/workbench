import { createActions } from '@u';
import types from './types';
import { getAllServesGroup } from './api';

const {
	GET_ALL_SERVES_GROUP,
} = types;

export default createActions(
  {
    namespace: 'application',
  },
  {
    [GET_ALL_SERVES_GROUP]: getAllServesGroup,
  },
);
