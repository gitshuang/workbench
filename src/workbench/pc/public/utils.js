import { createActions as createReduxActions } from 'redux-actions';

export const noop = () => {};

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
    let [ actionMap, ...identityActions ] = args;
    namespace = namespaceObj.namespace.split('.');
    const result = {};
    const space = namespace.reduce((obj, name)=>{
      name = name.toUpperCase();
      obj[name] = {};
      return obj[name];
    }, result);
    if (typeof actionMap === 'object') {
      Object.assign(space, actionMap);
    } else {
      identityActions = [ actionMap ].concat(identityActions);
    }
    identityActions.reduce((obj, identity) => {
      obj[identity] = undefined;
      return obj;
    }, space);
    const actions = createReduxActions(result);
    return namespace.reduce((action, space)=>{
      return action[space] ? action[space] : action;
    }, actions);
  } else {
    args = [namespaceObj].concat(args);
    return createReduxActions(...args);
  }
}

const getHost = (key = 'api') => {
  const hosts = {
    api: {
      production: '/workbench',
      development: '',
    },
  };
  return hosts[key][process.env.NODE_ENV];
};

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
            const { status, data, msg } = result;
            if (status) {
              return Promise.resolve(data);
            }
            return Promise.reject(msg);
          }
          return Promise.reject(new Error('接口未返回数据'));
        });
      }
      return Promise.reject(new Error('请求失败'));
    });
  },
  options(method = 'get') {
    return {
      method: method.toUpperCase(),
      credentials: 'include',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
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
  const options = optionsMaker('post');
  options.headers = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
  try {
    options.body = JSON.stringify(oriParams);
  } catch(e) {
    return Promise.reject(e);
  }
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
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
  }
  return `LS-${(S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4())}`;
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
      } catch(e) {
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
