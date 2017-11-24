import { get, post } from '@u';

export const setManageList = (list) => {
  return post('/setManageList', { list });
}
export const getManageList = () => get('/desktop/getdeskTop');
