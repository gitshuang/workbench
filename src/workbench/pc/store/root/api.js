import { get, postFileCros, post } from '@u';

export const getUserInfo = () => get('/user/getUserInfo');
export const uploadApplication = data => postFileCros('https://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon', data);
export const getPoll = () => get('/diwork-heartbeat/heartbeat/checkSession');
export const setCurrent = type => post('/language/setCurrent', { langCode: type });
export const getAllEnable = () => get('/language/getAllEnable');
export const getCurrent = () => get('/language/current');
export const setCurrentNot = type => post('/language/setCurrentNotLogin', { langCode: type });
export const getAllEnableNot = () => get('/language/getAllEnableNotLogin');
export const getCurrentNot = () => get('/language/currentNotLogin');
export const getDefaultDesktop = () => get('/defaultDesktop/query');
export const setDefaultDesktop = (data) => post('/defaultDesktop/update', data);