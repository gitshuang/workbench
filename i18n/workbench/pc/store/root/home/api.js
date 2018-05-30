import { get, post } from '@u';

export const getUserInfo = () => get('/user/getUserInfo');
export const getWorkList = param => get('/desktop/getdeskTop', param);
export const getSearchEnterList = param => get('/desktop/getdeskTop', param);
export const setCutUser = () => get('/user/setCutUser');

export const setCreateEnter = (list, updateType) => {
  // 团队升级企业
  if (updateType === 'upgrade_enter') {
    return post('/manager/team/upgradeEnter', list);
    // 设置团队
  } else if (updateType === 'update_enter') {
    return post('/manager/enter/setting', list);
  }// $i18n{api.js0}$i18n-end
  return post('/manager/teamEnter/createEnter', list);
};
export const getEnterInfo = param => get(`/manager/enter/info?enterId=${param}`);

export const getSearchEnterOrTeam = () => get('/user/getCanLoginTenants');

export const getApplicationList = () => (get('/manager/application/getAllAppsbyLabelGroup'));
