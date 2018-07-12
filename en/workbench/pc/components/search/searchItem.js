import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'components/loading';
import Normal from './normal';

const searchItemClassMap = {};

function getFetchIe9(url, options = {}) {
  if (window.XDomainRequest) {
    const fh = url.indexOf('?') === -1 ? '?' : '&';
    const time = new Date().getTime();
    const fetchUrl = `${fh}tm=${time}`;
    return new Promise((resolve, reject) => {
      const method = options.method || 'get';
      const timeout = options.timeout || 30000;
      const XDR = new XDomainRequest();
      XDR.open(method, fetchUrl);
      XDR.timeout = timeout;
      XDR.onload = () => {
        try {
          return resolve(XDR.responseText);
        } catch (e) {
          reject(e);
        }
        return reject();
      };
      XDR.onprogress = () => { };
      XDR.ontimeout = () => Promise.reject(new Error('Request failed.'));
      XDR.onerror = () => Promise.reject(new Error('Request failed.'));
      setTimeout(() => {
        XDR.send();
      }, 0);
    });
  }
  return Promise.reject(new Error('Request failed.'));
}

function getFetch(url) {
  const browser = navigator.appName;
  const bVersion = navigator.appVersion;
  if (browser === 'Microsoft Internet Explorer' && /9./i.test(bVersion)) {
    return getFetchIe9(url, { method: 'get', timeout: 3000 });
  }
  return fetch(url, {
    method: 'GET',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
    },
  }).then((response) => {
    if (response.ok) {
      return response.text().then((text) => {
        if (text) {
          return Promise.resolve(text);
        }
        return Promise.reject(new Error('No data returned from the interface.'));
      });
    }
    return Promise.reject(new Error('Request failed.'));
  });
}

function getResult(text, dispatch, trigger) {
  // eslint-disable-next-line
  const fn = new Function(
    'React',
    'searchTool',
    `return ${text}`,
  );
  const result = fn(
    React,
    {
      dispatch,
      trigger,
    },
  );
  return result.default || result;
}

function getData({ url, type, dispatch, trigger }) {
  const searchItemClass = searchItemClassMap[type];
  if (typeof searchItemClass === "undefined") {
    searchItemClassMap[type] = getFetch(url).then((text) => {
      try {
        searchItemClassMap[type] = getResult(text, dispatch, trigger);
        return Promise.resolve(true);
      } catch (e) {
        return Promise.reject(e);
      }
    }, e => Promise.reject(e));
  } else if (!(searchItemClass instanceof Promise)) {
    return Promise.resolve(true);
  }
  return searchItemClassMap[type];
}

function getSearchItemClass(type) {
  const searchItemClass = searchItemClassMap[type];
  return searchItemClass || Normal;
}

class SearchItemWrap extends Component {
  static propTypes = {
    data: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    from: PropTypes.string,
  }
  static defaultProps = {
    data: '',
    type: '',
    url: '',
    from: '',
  }
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }
  componentWillMount() {
    const {
      url,
      type,
      dispatch,
      trigger,
    } = this.props;
    if (url) {
      getData({ url, type, dispatch, trigger }).then(() => {
        this.setState({
          loaded: true,
        });
      }, e => console.log(e));
    } else {
      this.setState({
        loaded: true,
      });
    }
  }
  render() {
    if (this.state.loaded) {
      const Item = getSearchItemClass(this.props.type);
      let data = {};
      try {
        data = JSON.parse(this.props.data);
      } catch (e) {
        console.log(e);
      }
      return <Item data={data} from={this.props.from} />;
    }
    return <Loading container={this} show />;
  }
}

export default SearchItemWrap;
