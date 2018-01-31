import { createActions } from '@u';
import types from './types';

import {
  uploadApplication,
  creataTeam
} from './api';

const {
  UPLOAD_APPLICATION,
  CREATE_TEAM
} = types;

export default createActions(
  {
    namespace: 'team',
  },
  {
    [UPLOAD_APPLICATION]: uploadApplication,
    [CREATE_TEAM]: creataTeam,
  },
);
