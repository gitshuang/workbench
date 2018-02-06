import { get,post } from '@u';

export const getInviteUsersJoinAddress = () => get('/invite/getInviteUsersJoinAddress');
export const sendMessage = (param) => {return post('/invite/sendMessage', param)};