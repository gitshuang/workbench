import { get } from '@u';

export const setManageList = function(list){
  return get('/setManageList', { list });
}
export const getManageList = () => {
  return get('/getManageList');
}
