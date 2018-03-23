import { get, post, postFileCros } from '@u';

export const getTeamInfo = () =>{
  return get('/manager/team/info');
}
export const uploadApplication = (data) => postFileCros(data);
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
export const removeUser = (id) =>{
  return post('/manager/team/removeUser',{ "userIds":[id] } );
}

export const transferTeam = (id) =>{
  return post('/manager/teamEnter/createTeam',{id});
}
export const dismissTeam = (url) =>{
  return post('/manager/'+url);
}
export const exitTeam = (url) =>{
  return post('/manager/'+url);
}
export const getAllApps = () =>{
  return get('/manager/application/getAllAppsForTeam');
}