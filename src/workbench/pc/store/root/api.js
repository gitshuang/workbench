import { get } from '@u';

export const getServiceList = () => get('/application/getAllAppsGroupByLabels');
export const getMessage = () => get('/getMessage');
