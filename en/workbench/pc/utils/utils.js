/**
 * 获取_enhash地址_en#后面的路径数组_en
 * @returns {string[]}
 */
function getHashParameters() {
  var arr = (location.hash || "").replace(/^\#\//, '').split("\/");
  return arr;
}

/**
 * 设置返回路径数组，仅供_enreducer使用_en
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
