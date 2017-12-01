import { get, post } from '@u';

export const getProductInfo = (
  code,
  type
) => {
  if (type === 'app') {
    return get('/serve/getServeInfoByAppCode', {
      appCode: code,
    });
  }
  return get('/serve/getServeInfoByServeCode', {
    serveCode: code,
  });
}
export const getTitleService = (serveCode) => {
  return get('/serve/getServeInfoWithDetail', { serveCode });
}
export const setPinCancel = serveCode => post('/widget/deleteByServeCode', { serveCode });
export const setPinAdd = (
  serveCode,
  widgetName,
  parentId,
  icon,
  templateId,
) => post('/widget/create', {
  icon,
  parentId,
  serveCode,
  templateId,
  type: 3,
  widgetName,
});
export const setAddGroup = (widgetName) => post('/widget/create', {
  type: 1,
  widgetName,
});
export const getPinGroup = () =>{
  return get('/widget/getFolders');
}
