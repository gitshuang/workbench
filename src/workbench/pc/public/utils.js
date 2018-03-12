import { createActions as createReduxActions } from 'redux-actions';
import ReactDOM from 'react-dom';

export const noop = () => { };

export const mergeReducers = (...reducers) =>
  (state, action) => reducers.reduce(
    (prevState, reducer) => Object.assign(prevState, reducer(state, action)),
    {},
  );

export const createTypes = (...types) => {
  return types.reduce((obj, type) => {
    obj[type] = type;
    return obj;
  }, {});
};

export const createActions = (namespaceObj, ...args) => {
  let namespace = [];
  if (typeof namespaceObj === 'object' && namespaceObj.namespace) {
    let [actionMap, ...identityActions] = args;
    namespace = namespaceObj.namespace.split('.');
    const result = {};
    const space = namespace.reduce((obj, name) => {
      name = name.toUpperCase();
      obj[name] = {};
      return obj[name];
    }, result);
    if (typeof actionMap === 'object') {
      Object.assign(space, actionMap);
    } else {
      identityActions = [actionMap].concat(identityActions);
    }
    identityActions.reduce((obj, identity) => {
      obj[identity] = undefined;
      return obj;
    }, space);
    const actions = createReduxActions(result);
    return namespace.reduce((action, space) => {
      return action[space] ? action[space] : action;
    }, actions);
  } else {
    args = [namespaceObj].concat(args);
    return createReduxActions(...args);
  }
}

export const logout = () => {
  const { location: { origin } } = window;
  window.location.href = `/logout?service=${encodeURIComponent(`${origin ? origin : ''}/`)}`;
}

export const getHost = (key = 'api') => {
  const hosts = {
    api: {
      production: '',
      development: '',
    },
    euc: {
      production: 'https://euc.yonyoucloud.com',
      development: 'https://idtest.yyuap.com',
    }
  };
  return hosts[key][process.env.NODE_ENV];
};

export const IS_IE = !!window.ActiveXObject;

const fetchTools = {
  params(params) {
    try {
      return Object.keys(params).map((key) => {
        let param = params[key];
        switch (typeof param) {
          case 'object':
            param = escape(JSON.stringify(param));
            break;
          case 'undefined':
            param = '';
            break;
          default:
            break;
        }
        return `${key}=${param}`;
      }).join('&');
    } catch (e) {
      console.log('error in urlParams');
      return '';
    }
  },
  fetch(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.text().then((text) => {
          if (text) {
            let result = {
              status: 0,
              msg: '接口请求失败',
            };
            try {
              result = JSON.parse(text);
            } catch (e) {
              return Promise.reject(new Error('接口返回数据无法解析'));
            }
            const { status, data, msg, errorCode } = result;
            if (status) {
              return Promise.resolve(data);
            } else if (errorCode) {
              switch (errorCode) {
                case '000001':
                  logout();
                  break;
                default:
                  break;
              }
            }
            return Promise.reject(msg);
          }
          return Promise.reject(new Error('接口未返回数据'));
        });
      }
      return Promise.reject(new Error('请求失败'));
    });
  },
  options(method = 'get', options = {}) {
    return {
      method: method.toUpperCase(),
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      ...options,
    };
  },
  url(url) {
    if (!url) {
      throw new Error('has no url!');
    } else if (url.indexOf('http') !== 0) {
      url = `${getHost()}${url}`;
    }
    return url;
  },
};

export function post(oriUrl, oriParams = {}) {
  const {
    params,
    fetch,
    options: optionsMaker,
    url,
  } = fetchTools;
  const data = params(oriParams);
  const options = optionsMaker('post');
  options.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
  try {
    options.body = JSON.stringify(oriParams);
  } catch (e) {
    return Promise.reject(e);
  }
  return fetch(url(oriUrl), options);
}

export function postFileCros(oriUrl, file) {
  const {
    params,
    fetch,
    options: optionsMaker,
    url,
  } = fetchTools;
  const options = optionsMaker('post', {
    mode: 'cors',
  });
  delete options.headers;
  try {
    options.body = file;
  } catch (e) {
    return Promise.reject(e);
  }
  console.log(options);
  return fetch(url(oriUrl), options);
}

export function get(oriUrl, oriParams = {}) {
  const {
    params,
    fetch,
    options,
    url: urlMaker,
  } = fetchTools;

  const data = params(oriParams);
  let url = urlMaker(oriUrl);

  if (data) {
    url = `${url}?${data}`;
  }

  return fetch(url, options());
}

export function mapStateToProps(...keys) {
  if (keys.length) {
    return (state, ownProps) => {
      const rootState = state;
      let { namespace } = keys.slice(-1)[0];
      if (namespace) {
        namespace = namespace.split('.');
        state = namespace.reduce(
          (subState, space) => {
            let stateByNamespace = subState[space];
            if (!stateByNamespace) {
              stateByNamespace = subState;
            }
            return stateByNamespace;
          },
          state,
        );
      }

      return keys.reduce((obj, key) => {
        if (typeof key === 'string') {
          obj[key] = state[key];
        } else if (
          typeof key === 'object' &&
          typeof key.key === 'string' &&
          typeof key.value === 'function'
        ) {
          obj[key.key] = key.value(state, ownProps, rootState);
        }
        return obj;
      }, {});
    };
  } else {
    return () => ({});
  }
}

export function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return `LS-${(S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4())}`;
}

export function findPath(datas, childrenKey, compareKey, compareValue) {
  const paths = [];
  function loop(children) {
    for (let i = 0, l = children.length; i < l; i++) {
      let result = false;
      const child = children[i];
      paths.push(child);
      if (child[childrenKey]) {
        result = loop(child[childrenKey]);
      }
      let value;
      try {
        value = compareKey.split('.').reduce((obj, key) => {
          return obj[key]
        }, child);
      } catch (e) {
        console.log(e);
      }
      if (value === compareValue) {
        result = true;
      }
      if (result) {
        return result;
      } else {
        paths.pop();
      }
    }
    return false;
  }
  loop(datas);
  return paths;
}

export function avoidSameName(namaArr, name) {
  const reg = new RegExp(`^${name}(\\((\\d)\\)){0,1}$`);
  let num = 0;
  namaArr.forEach((item) => {
    if (reg.test(item)) {
      let curNum = item.match(reg)[2];
      if (curNum) {
        curNum = parseInt(curNum, 10) + 1;
        if (curNum > num) {
          num = curNum;
        }
      } else if (!num) {
        num = 1;
      }
    }
  });
  if (num) {
    return `${name}(${num})`;
  } else {
    return name;
  }
}

export function getContext() {
  if (window.diworkContext && typeof window.diworkContext === 'function') {
    return window.diworkContext();
  } else {
    return {};
  }
}

export const IS_REACT_16 = !!ReactDOM.createPortal;

/**
 * 汉子超过3位截取，其他字符8位数
 * @param {*} str
 */
export function getStrLenSubstr(str, zh_len, cn_len, sl) {
  if (!str) return "";
  let newStr = "";
  var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (reg.test(str)) {
    if(str.length == zh_len){
      newStr = str;
    }else{
      newStr = str.length > zh_len ? str.substring(0, zh_len) + (sl ? "" : "...") : str;
    }
  } else {
    if(str.length == cn_len){
      newStr = str;
    }else{
      newStr = str.length > cn_len ? str.substring(0, cn_len) + (sl ? "" : "...") : str;
    }
    // newStr = str.substring(0,cn_len)+(sl?"":"...");
  }
  return newStr;
}

export function browserRedirect() {
  var sUserAgent = navigator.userAgent.toLowerCase();
  var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
  var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
  var bIsMidp = sUserAgent.match(/midp/i) == "midp";
  var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
  var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
  var bIsAndroid = sUserAgent.match(/android/i) == "android";
  var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
  var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

  if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM))  //判断是否有非pc的值存在
  {
    // alert("pc");
    //没有，则显示为pc
    return ("pc");
  } else {
    if (bIsIpad.length != 0) { return ("ipad"); }
    if (bIsIphoneOs.length != 0) { return ("iphone os"); }
    if (bIsMidp.length != 0) { return ("midp"); }
    if (bIsUc7.length != 0) { return ("rv:1.2.3.4"); }
    if (bIsUc.length != 0) { return ("ucweb"); }
    if (bIsAndroid.length != 0) { return ("android"); }
    if (bIsCE.length != 0) { return ("windows ce"); }
    if (bIsWM.length != 0) { return ("windows mobile"); }
    //显示对应的产品名称
  }
}

export function postMessageToWin(win, data) {
  if (win && data) {
    win.postMessage(JSON.stringify(data), '*');
  }
}
// 获取location 参数
export function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

export function getNewEvent(name) {
  if (IS_IE) {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(name, true, true, undefined);
    return evt;
  } else {
    return new Event(name, {
      bubbles: true,
    });
  }
}
