import { get } from '@u';

export default function getAllApps(){
  return get('/application/getAllApps');
}
