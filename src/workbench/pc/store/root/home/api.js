import { get } from '@u';

export const getUserInfo = () => get('/user/getUserInfo');
export const getWorkList = (param) => {
  return get('/desktop/getdeskTop',param);
}
export const setCutUser = () => get('/user/setCutUser');
