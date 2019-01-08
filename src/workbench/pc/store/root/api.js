import { get, postFileCros, post } from '@u';

export const getUserInfo = () => get('/user/getUserInfo');
export const getServiceList = () => get('/application/getTopApps');
export const uploadApplication = data => postFileCros('https://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon', data);
export const getPoll = () => get('/diwork-heartbeat/heartbeat/checkSession');
export const getPortal = () => get('/manager/portalCtrl/getPortal');
export const setCurrent = type => post('/language/setCurrent', { langCode: type });
export const getAllEnable = () => get('/language/getAllEnable');
export const getCurrent = () => get('/language/current');
export const setCurrentNot = type => post('/language/setCurrentNotLogin', { langCode: type });
export const getAllEnableNot = () => get('/language/getAllEnableNotLogin');
export const getCurrentNot = () => get('/language/currentNotLogin');
export const getFolders = () => get('/widget/getFolders');
export const cancelFolders = serviceCode => post('/widget/deleteByServiceCode', { serviceCode });
export const setFolders = (serviceCode, widgetName, parentId) => post('/widget/create', { parentId, serviceCode, type: 3, widgetName });
export const addFolders = widgetName => post('/widget/create', { type: 1, widgetName });