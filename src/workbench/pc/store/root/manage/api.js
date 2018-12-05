import { get, post } from '@u';

export const setManageList = list => post('/desktop/update', list, true);
export const getManageList = () => get('/desktop/getdeskTop');

export const getAllServicesByLabelGroup = serviceName => get(`/service/getAllServicesByLabelGroup?serviceName=${serviceName}`);
