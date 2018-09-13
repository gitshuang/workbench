import { get, postFileCros, post } from '@u';

export const getServiceList = () => get('/application/getShortcutApps');
export const getMessage = () => get('/getMessage');
export const uploadApplication = data => postFileCros('https://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon', data);
export const getPoll = () => get('/diwork-heartbeat/heartbeat/checkSession');
export const getPortal = () => get('/manager/portalCtrl/getPortal');
export const setCurrent = type => post('/language/setCurrent', {langCode: type});
export const getAllEnable = () => get('/language/getAllEnable');
export const getCurrent = () => get('/language/current');
export const setCurrentNot = type => post('/language/setCurrentNotLogin', {langCode: type});
export const getAllEnableNot = () => get('/language/getAllEnableNotLogin');
export const getCurrentNot = () => get('/language/currentNotLogin');