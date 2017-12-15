import { get } from '@u';

export const getServiceList = () => get('/application/getAllApps');
export const getMessage = () => get('/getMessage');
export const getLatestAccessList = () => get('/getLatestAccess');
export const getPromotionServiceList = () => get('/getPromotionService');