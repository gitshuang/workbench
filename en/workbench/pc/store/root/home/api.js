import { get, post } from '@u';

export const getUserInfo = () => get('/user/getUserInfo');
export const getWorkList = param => get('/desktop/getdeskTop', param);

// 企业中设置
export const setCreateEnter = (list, updateType) => {
  // 团队升级企业
  if (updateType === 'update') {
    return post('/manager/team/upgradeEnter', list);
    // 设置团队
  } else if (updateType === 'setting') {
    return post('/manager/enter/setting', list);
  }// 创建企业
  return post('/manager/teamEnter/createEnter', list);
};
// 获取企业信息
export const getEnterInfo = param => get(`/manager/enter/info?enterId=${param}`);

export const getSearchEnterOrTeam = () => get('/user/getCanLoginTenants');

export const getApplicationList = () => (get('/manager/application/getApplicationTips'));

export const clearApplicationTips= ()=> post('/manager/application/clearApplicationTips',{});
