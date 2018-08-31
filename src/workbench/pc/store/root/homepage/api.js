import { get } from '@u';

export const getUserInfo = (userId = '') => get('/user/getUserInfo', { userId });