import { get } from '@u';

export const getAllApplicationList = (appName) => get('/serve/getAllAppsGroupByLabels?appName='+appName);

export const getAllApps = () => get('/application/getAllApps');

// export function getAllApps(){
//   return get('/application/getAllApps');
// }