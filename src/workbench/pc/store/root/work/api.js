import { get, post } from '@u';

export const getProductInfo = (
  code,
  type
) => {
  if (type === 'app') {
    return get('/service/getServiceInfoByAppCode', {
      appCode: code,
    });
  }
  return get('/service/getServiceInfoByServiceCode', {
    serviceCode: code,
  });
}
export const getTitleService = (serviceCode) => {
  return get('/service/getServiceInfoWithDetail', { serviceCode });
}
export const setPinCancel = serviceCode => post('/widget/deleteByServiceCode', { serviceCode });
export const setPinAdd = (
  serviceCode,
  widgetName,
  parentId,
  icon,
  templateId,
) => post('/widget/create', {
  icon,
  parentId,
  serviceCode,
  templateId,
  type: 3,
  widgetName,
});
export const setAddGroup = (widgetName) => post('/widget/create', {
  type: 1,
  widgetName,
});
export const getPinGroup = () => get('/widget/getFolders');
