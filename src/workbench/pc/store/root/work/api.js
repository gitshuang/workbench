import { get } from '@u';

export const getProductInfo = function(id){
  return get('/getProductInfo', { id });
}
export const getTitleService = () => get('/getTitleService');
export const setPinCancel = () => {
  debugger;
  return get('/setPinCancel')
};
