import { get } from '@u';

export const getUserInfo = () => get('/user/getUserInfo');
export const getWorkList = () => get('/desktop/getdeskTop');
export const setCutUser = () => get('/user/setCutUser');
