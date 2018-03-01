import { get,post } from '@u';

export const getUserInfo = () => get('/user/getUserInfo');
export const getWorkList = (param) => {
  return get('/desktop/getdeskTop',param);
}
export const getSearchEnterList = (param) => {
  return get('/desktop/getdeskTop',param);
}
export const setCutUser = () => get('/user/setCutUser');

export const setCreateEnter = (list,updateType) => {
  if(updateType){
    return post('/manager/team/upgradeEnter', list);
  }else{
    return post('/manager/teamEnter/createEnter', list);
  }
  
}
export const getEnterInfo = (param) => get('/manager/enter/info?enterId='+param);