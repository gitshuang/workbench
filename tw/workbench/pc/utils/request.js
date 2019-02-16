/**
 * 解析response為JSON對象
 *
 * @param response
 * @returns {*}
 */
function parseJSON(response) {
	return response.json();
}

/**
 * http狀態監測
 *
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

/**
 * @param contentType
 * @returns {*}
 */
export function getContentType(contentType) {
	const contentTypeArray = ['application/x-www-form-urlencoded', 'application/json'];
	if (contentType) {
		if (contentTypeArray.find((ele) => (ele === contentType))) {
			return contentType;
		} else {
			return contentTypeArray[0];
		}
	}
	return contentTypeArray[0];
}

/**
 * 獲取數據屬性值，規則如下：getStatus={data:{a:1}}，dataPro=data.a，則調用此方法返回getStatus['data']['a']，也就是'1'
 *
 * @param dataPro
 * @param getStatus
 * @returns {*}
 */
export function getDataProObj(dataPro, getStatus) {
	if (!(dataPro && getStatus)) {
		return null;
	}
	if (dataPro.indexOf('.') > 0) {
		const preStr = dataPro.substring(0, dataPro.indexOf('.'));
		const subStr = dataPro.substring(dataPro.indexOf('.') + 1);
		return getDataProObj(subStr, getStatus[preStr]);
	} else {
		return getStatus[dataPro];
	}
}

/**
 *
 * @param url
 * @param params
 * @returns {*}
 */
export function getUrlWithParams(url, params) {
	if (!params) {
		return url;
	}
	const paramsJSON = eval('(' + params.toString() + ')');
	const keys = Object.keys(paramsJSON);

	keys.forEach(function (key, index) {
		if (index === 0) {
			url += '?';
		} else {
			url += '&';
		}
		url += (key + '=' + encodeURIComponent(paramsJSON[key]));
	})
	return url;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {function} callback
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options, callback) {
	return fetch(`${url}`, {
		mode: 'cors',
		// credentials: 'include',
		headers: {
			'content-type': 'application/json'
		},
		...options
	}).then(checkStatus)
		.then(parseJSON)
		.then(data => {
			callback(data)
		})
		.catch(err => {
			console.error(err.toString());
			throw new Error(err);
			return;
		});
}
