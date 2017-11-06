export const noop = () => {};

export const mergeReducers = (...reducers) =>
  (state, action) => reducers.reduce(
    (prevState, reducer) => Object.assign(prevState, reducer(state, action)),
    {},
  );

export const createTypes = (...types) => types.reduce((obj, type) => {
  obj[type] = type;
  return obj;
}, {});

const getHost = (key = 'api') => {
  const hosts = {
    api: {
      release: 'https://yyapp.yonyoucloud.com/personas',
      production: 'http://uastest.yyuap.com/personas',
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
              return Promise.reject('接口返回数据无法解析');
            }
            const { status, data, msg } = result;
            if (status) {
              return Promise.resolve(data);
            }
            return Promise.reject(msg);
          }
          return Promise.reject('接口未返回数据');
        });
      }
      return Promise.reject('请求失败');
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
  const data = params(oriParams);
  const options = optionsMaker('post');

  if (data) {
    options.body = data;
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
  return (state, ownProps) => {
    let rootState = state;
    let { namespace } = keys.slice(-1)[0];
    if (namespace) {
      namespace = namespace.split('.');
      state = namespace.reduce(
        (state, space) => {
          let stateByNamespace = state[space];
          if (!stateByNamespace) {
            stateByNamespace = state;
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
          typeof key.value == 'function'
        ) {
        obj[key.key] = key.value(state, ownProps, rootState);
      }
      return obj;
    }, {});
  };
}
