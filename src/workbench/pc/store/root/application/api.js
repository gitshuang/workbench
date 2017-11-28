import { get } from '@u';

export default function getAllAppsGroupByLabels(){
  return get('/application/getAllAppsGroupByLabels');
}
