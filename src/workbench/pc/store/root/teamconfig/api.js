import { get, post, postFileCros } from '@u';

export const getTeamInfo = () =>{
  return get('/manager/team/info');
}
export const uploadApplication = (data) => postFileCros(
  'https://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon',
  data,
);
export const createTeam = (data) =>{
  return post('/manager/team/setting',data);
}

export const getUserList = (data) =>{
  return get('/manager/team/queryUserPage',data);
}
export const adminToUser = (userId) =>{
  return post('/manager/team/changeAdmin2User',{userId});
}
export const userToAdmin = (userId) =>{
  return post('/manager/team/changeUser2Admin',{userId});
}
// export const adminToUser = (userId) =>{
//   return get('/application/getAllAppsForTeam');
// }
// export const userToAdmin = (userId) =>{
//   return get('/application/getAllAppsForTeam');
// }
export const removeUser = (userIds) =>{
  return post('/manager/team/removeUser',{userIds:[userIds]});
}

export const transferTeam = (id) =>{
  return post('/manager/teamEnter/createTeam',{id});
}
export const dismissTeam = (id) =>{
  return post('/manager/teamEnter/createTeam',{id});
}
export const exitTeam = (id) =>{
  return post('/manager/teamEnter/createTeam',{id});
}
export const getAllApps = () =>{
  return get('/manager/application/getAllAppsForTeam');
}