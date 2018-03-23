import { get, post, postFileCros } from '@u';

export const uploadApplication = (data) => postFileCros(data);
export const createTeam = (data) =>{
  return post('/manager/teamEnter/createTeam',data);
}