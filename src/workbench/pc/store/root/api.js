import { get ,postFileCros} from '@u';
export const getServiceList = () => get('/application/getShortcutApps');
export const getMessage = () => get('/getMessage');
export const getLatestAccessList = () => get('/getLatestAccess');
export const getPromotionServiceList = () => get('/getPromotionService');
export const uploadApplication = (data) => postFileCros("https://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon",data);
export const getPoll = (sessionId) => {
  return get('/heartbeat/checkSession',{sessionId});
} 