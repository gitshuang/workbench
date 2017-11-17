import { get } from '@u';

export const getProductInfo = function(id){
  return get('/getProductInfo', { id });
}
export const getTitleService = () => get('/getTitleService');
export const setPinCancel = () => {
  return get('/setPinCancel')
};
export const setPinAdd = () => {
  return get('/setPinAdd')
};
export const setAddGroup = () => {
  return get('/setAddGroup')
};
export const getPinGroup = () => {
  return get('/getPinGroup')
};
