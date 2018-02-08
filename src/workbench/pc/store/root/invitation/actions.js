import { createActions } from '@u';
import types from './types';
import { getInviteUsersJoinAddress, sendMessage ,getQRCode} from './api';

const {
  GET_INVITE_USERS_JOIN_ADDRESS,
  SEND_MESSAGE,
  GET_QRCODE
} = types;

export default createActions(
  {
    namespace: 'invitation',
  },
  {
    [GET_INVITE_USERS_JOIN_ADDRESS]: getInviteUsersJoinAddress,
    [SEND_MESSAGE]: sendMessage,
    [GET_QRCODE]: getQRCode,
  }
);
