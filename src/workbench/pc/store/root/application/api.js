import { get } from '@u';

export const getAllApplicationList = (appName) => get('/application/getAllAppsbyLabelGroup?appName='+appName);

export const getAllApps = () => get('/application/getAllApps');

