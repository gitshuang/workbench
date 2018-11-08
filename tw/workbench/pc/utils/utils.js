import {getContext} from '@u';

/**
 * 獲取hash地址#後面的路徑數組
 * @returns {string[]}
 */
function getHashParameters() {
	var arr = (location.hash || "").replace(/^\#\//, '').split("\/");
	return arr;
}

/**
 * 設置返回路徑數組，僅供reducer使用
 * @param backUrl
 */
export function setBackUrl(backUrl) {
	const hashParamArray = getHashParameters();
	const hashParamObj = {};
	switch (hashParamArray.length) {
		case 3:
			hashParamObj.subCode = hashParamArray[2];
		case 2:
			hashParamObj.code = hashParamArray[1];
		case 1:
			hashParamObj.type = hashParamArray[0];
		default:
			break;
	}
	backUrl.push(hashParamObj);
}

/**
 * 操作日誌
 *
 * @param serviceCode
 */
export function pushYA(serviceCode) {
	const {profile, tenantid, userid} = getContext();
	if (window._ya) {
		window._ya.push(['_trackEvent', 'operator', 'profile|userId|tenantId|serviceCode', profile + '|' + userid + '|' + tenantid + '|' + serviceCode]);
	}
}

/**
 * 獲取金額符號
 */
export function getSumSign() {
	const {locale} = getContext();
	switch (locale) {
		case 'zh_CN':
			return '￥';
		case 'en_US':
			return '$';
		case 'zh_TW':
			return '￥';
		default:
			return '￥';
	}

}

export function appendSearchParam(url, params) {
	if (!params) {
		return url;
	}
  if (url) {
    const urlObj = new URL(url);
    Object.keys(params).forEach((name) => {
      urlObj.searchParams.append(name, params[name]);
    });
    return urlObj.toString();
  }
  return url;
}
