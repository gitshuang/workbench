import { get } from '@u';

export const setWorkList = function(list){
  return get('/setWorkList', { list });
}
