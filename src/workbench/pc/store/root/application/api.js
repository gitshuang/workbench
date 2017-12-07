import { get } from '@u';

export const getAllApplicationList = () => get('/serve/getAllAppsGroupByLabels');

export const getAllApps = () => get('/application/getAllApps');

// export function getAllApps(){
//   return get('/application/getAllApps');
// }