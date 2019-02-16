import { get, post } from '@u';

export const getServiceList = () => get('/application/getTopApps');
export const getPortal = () => get('/manager/portalCtrl/getPortal');
export const getFolders = () => get('/widget/getFolders');
export const cancelFolders = serviceCode => post('/widget/deleteByServiceCode', { serviceCode });
export const setFolders = (serviceCode, widgetName, parentId) => post('/widget/create', { parentId, serviceCode, type: 3, widgetName });
export const addFolders = widgetName => post('/widget/create', { type: 1, widgetName });
export const getAllMenuList = () => get('/menubar/getAll'); // eslint-disable-line
export const getHistoryList = () => get('/history/list');
export const delHistory = latestAccessIds => post('/history/del', { latestAccessIds });
export const delAllHistory = () => post('/history/delAll');