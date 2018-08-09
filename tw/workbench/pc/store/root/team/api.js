import { post, postFileCros } from '@u';

export const uploadApplication = data => postFileCros('https://pubapi.yonyoucloud.com/file/upload/oss/workbench-image-path-applicationIcon', data);
export const createTeam = data => post('/manager/teamEnter/createTeam', data);

