import { get, post, postFileCros } from '@u';

export const getTeamInfo = () => get('/manager/team/info');
export const createTeam = data => post('/manager/team/setting', data);

export const getUserList = data => get('/manager/team/queryUserPage', data);
export const adminToUser = userId => post('/manager/team/changeAdmin2User', { userId });
export const userToAdmin = userId => post('/manager/team/changeUser2Admin', { userId });
export const removeUser = id => post('/manager/team/removeUser', { userIds: [id] });

export const transferTeam = id => post('/manager/teamEnter/createTeam', { id });
export const dismissTeam = url => post(`/manager/${url}`);
export const exitTeam = url => post(`/manager/${url}`);
export const getAllApps = () => get('/manager/application/getAllAppsForTeam');
