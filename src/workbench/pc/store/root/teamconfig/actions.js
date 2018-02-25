import { createActions } from '@u';
import types from './types';

import {
  getTeamInfo,
  uploadApplication,
  createTeam,
  adminToUser,
  userToAdmin,
  removeUser,
  transferTeam,
  dismissTeam,
  exitTeam,
  getAllApps,
} from './api';

const {
  GET_TEAM_INFO,
  UPLOAD_APPLICATION,
  CREATE_TEAM,
  ADMIN_TO_USER,
  USER_TO_ADMIN,
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
  GET_ALL_APPS
} = types;

export default createActions(
  {
    namespace: 'teamconfig',
  },
  {
    [UPLOAD_APPLICATION]: uploadApplication,
    [CREATE_TEAM]: createTeam,
    [REMOVE_USER]: removeUser,
    [TRANSFER_TEAM]: transferTeam,
    [DISMISS_TEAM]: dismissTeam,
    [EXIT_TEAM]: exitTeam,
    [GET_ALL_APPS]: getAllApps,
    [GET_TEAM_INFO]:getTeamInfo,
    [ADMIN_TO_USER]:adminToUser,
    [USER_TO_ADMIN]:userToAdmin,
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
