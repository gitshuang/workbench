/**
 * $i18n{utils.js0}$i18n-endhash$i18n{utils.js1}$i18n-end#$i18n{utils.js2}$i18n-end
 * @returns {string[]}
 */
function getHashParameters() {
  var arr = (location.hash || "").replace(/^\#\//, '').split("\/");
  return arr;
}

/**
 * $i18n{utils.js3}$i18n-endreducer$i18n{utils.js4}$i18n-end
 * @param backUrl
 */
function setBackUrl(backUrl) {
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

export default {getHashParameters, setBackUrl};
