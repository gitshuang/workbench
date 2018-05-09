import { createActions } from '@u';
import types from './types';
import { getInviteUsersJoinAddress, sendMessage } from './api';

const {
  GET_INVITE_USERS_JOIN_ADDRESS,
  SEND_MESSAGE,
} = types;

export default createActions(
  {
    namespace: 'invitation',
  },
  {
    [GET_INVITE_USERS_JOIN_ADDRESS]: getInviteUsersJoinAddress,
    [SEND_MESSAGE]: sendMessage,
  },
);
