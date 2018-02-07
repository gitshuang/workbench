import { createActions } from '@u';
import types from './types';

import {
  uploadApplication,
  createTeam,
  changeIdentity,
  removeUser,
} from './api';

const {
  UPLOAD_APPLICATION,
  CREATE_TEAM,
  CHANGE_IDENTITY,
  OPEN_REMOVE_MODAL,
  CLOSE_REMOVE_MODAL,
  REMOVE_USER,
  OPEN_UPGRADE_MODAL,
  CLOSE_UPGRADE_MODAL,
} = types;

export default createActions(
  {
    namespace: 'teamconfig',
  },
  {
    [UPLOAD_APPLICATION]: uploadApplication,
    [CREATE_TEAM]: createTeam,
    [CHANGE_IDENTITY]: changeIdentity,
    [REMOVE_USER]: removeUser,
  },
  OPEN_REMOVE_MODAL,
  CLOSE_REMOVE_MODAL,
  OPEN_UPGRADE_MODAL,
  CLOSE_UPGRADE_MODAL,
);
