import { get, post } from '@u';

export const setManageList = (list) => {
  return post('/desktop/update', list);
}
export const getManageList = () => get('/desktop/getdeskTop');

export const getAllServesByLabelGroup = (serveName) => get('/serve/getAllServesByLabelGroup?serveName='+serveName);
