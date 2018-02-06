import { get, post } from '@u';

export const setManageList = (list) => {
  return post('/desktop/update', list);
}
export const getManageList = () => get('/desktop/getdeskTop');

export const getAllServicesByLabelGroup = (serviceName) => get('/service/getAllServicesByLabelGroup?serviceName='+serviceName);
