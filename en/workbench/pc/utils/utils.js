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
	if (window._ya) {
		window._ya.push(['_trackEvent', 'operator', 'profile|userId|tenantId|serviceCode', profile + '|' + userid + '|' + tenantid + '|' + serviceCode]);
	}
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

export function changeURLArg(url, arg, arg_val) {
	var pattern = arg + '=([^&]*)';
	var replaceText = arg + '=' + arg_val;
	if (url.match(pattern)) {
	  var tmp = '/(' + arg + '=)([^&]*)/gi';
	  tmp = url.replace(eval(tmp), replaceText);
	  return tmp;
	} else {
	  if (url.match('[\?]')) {
		return url + '&' + replaceText;
	  } else {
		return url + '?' + replaceText;
	  }
	}
  }
