import { createActions } from '@u';
import types from './types';

import {
  uploadApplication,
  createTeam,
  changeIdentity,
  removeUser,
  transferTeam,
  dismissTeam,
  exitTeam,
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
  OPEN_TRANSFER_MODAL,
  CLOSE_TRANSFER_MODAL,
  TRANSFER_TEAM,
  OPEN_DISMISS_MODAL,
  CLOSE_DISMISS_MODAL,
  DISMISS_TEAM,
  OPEN_EXIT_MODAL,
  CLOSE_EXIT_MODAL,
  EXIT_TEAM,
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
    [TRANSFER_TEAM]: transferTeam,
    [DISMISS_TEAM]: dismissTeam,
    [EXIT_TEAM]: exitTeam,
  },
  OPEN_REMOVE_MODAL,
  CLOSE_REMOVE_MODAL,
  OPEN_UPGRADE_MODAL,
  CLOSE_UPGRADE_MODAL,
  OPEN_TRANSFER_MODAL,
  CLOSE_TRANSFER_MODAL,
  OPEN_DISMISS_MODAL,
  CLOSE_DISMISS_MODAL,
  OPEN_EXIT_MODAL,
  CLOSE_EXIT_MODAL,
);
