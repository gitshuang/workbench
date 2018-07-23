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
