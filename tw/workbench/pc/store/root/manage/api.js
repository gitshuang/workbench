import { get, post } from '@u';

export const setManageList = list => post('/desktop/update', list);
export const getManageList = () => get('/desktop/getdeskTop');

export const getAllServicesByLabelGroup = serviceName => get(`/service/getAllServicesByLabelGroup?serviceName=${serviceName}`);
export const getAllMenuList = () => get('/menubar/get4Edit'); // eslint-disable-line
