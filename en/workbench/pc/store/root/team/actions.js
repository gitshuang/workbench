import { createActions } from '@u';
import types from './types';

import {
  createTeam,
} from './api';

const {
  UPLOAD_APPLICATION,
  CREATE_TEAM,
} = types;

export default createActions(
  {
    namespace: 'team',
  },
  {
    [CREATE_TEAM]: createTeam,
  },
);
