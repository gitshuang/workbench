import { get, post, postFileCros } from '@u';

export const uploadApplication = (data) => postFileCros(
  'https://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon',
  data,
);
export const createTeam = (data) =>{
  return post('/manager/teamEnter/createTeam',data);
}
export const changeIdentity = (data) =>{
  return post('/manager/teamEnter/createTeam',data);
}
export const removeUser = (id) =>{
  return post('/manager/teamEnter/createTeam',{id});
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