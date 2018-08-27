import {getContext} from '@u';

/**
 * ObtainhashAddress#Path array below
 * @returns {string[]}
 */
function getHashParameters() {
	var arr = (location.hash || "").replace(/^\#\//, '').split("\/");
	return arr;
}

/**
 * Set return path array, which is only available toreducerUse
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
 * Operation Log
 *
 * @param serviceCode
 */
export function pushYA(serviceCode) {
	const {profile, tenantid, userid} = getContext();
	window._ya_.push(['_trackEvent', 'operator', 'Profile|userId|tenantId|serviceCode', profile + '|' + userid + '|' + tenantid + '|' + serviceCode]);
}

/**
 * Obtain Amt Sign
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
