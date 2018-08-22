import {getContext} from '@u';

/**
 * 获取hash地址#后面的路径数组
 * @returns {string[]}
 */
function getHashParameters() {
	var arr = (location.hash || "").replace(/^\#\//, '').split("\/");
	return arr;
}

/**
 * 设置返回路径数组，仅供reducer使用
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
 * 操作日志
 *
 * @param serviceCode
 */
export function pushYA(serviceCode) {
	const {profile, tenantid, userid} = getContext();
	window._ya_.push(['_trackEvent', 'operator', 'Profile|userId|tenantId|serviceCode', profile + '|' + userid + '|' + tenantid + '|' + serviceCode]);
}

/**
 * 获取金额符号
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
