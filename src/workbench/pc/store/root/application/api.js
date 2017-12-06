import { get } from '@u';

export default function getAllApps(){
  return get('/application/getAllApps');
}
export const getAllServesGroup = () => get('/serve/getAllServesGroupByLabels');