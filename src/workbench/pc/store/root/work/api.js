import { get } from '@u';

export default function getProductInfo(id){
  return get('/getProductInfo', { id });
}
