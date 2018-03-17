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
  if(updateType == "upgrade_enter"){//团队升级企业
    return post('/manager/team/upgradeEnter', list);
  }else if(updateType == "update_enter"){//设置团队
    return post('/manager/enter/setting', list);
  }else{//创建企业
    return post('/manager/teamEnter/createEnter', list);
  }
}
export const getEnterInfo = (param) => get('/manager/enter/info?enterId='+param);

export const getSearchEnterOrTeam = () => get('/user/getCanLoginTenants');
