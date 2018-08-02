import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Normal from './normal';

const searchItemClassMap = {};

function getFetch(url) {
  const browser = navigator.appName;
  const bVersion = navigator.appVersion;
  if (browser === 'Microsoft Internet Explorer' && /9./i.test(bVersion)) {
    axios.get(url).then((response) => {
      return Promise.resolve(response.data);
    }).catch((error)=>{
      console.log(error);
    });
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
        return Promise.reject(new Error('接口未返回数据'));
      });
    }
    return Promise.reject(new Error('请求失败'));
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
      console.log(1)
      try {
        searchItemClassMap[type] = getResult(text, dispatch, trigger);
        return Promise.resolve(true);
      } catch (e) {
        return Promise.reject(e);
      }
    }, e => Promise.reject(e));
  }
  console.log(searchItemClassMap[type]);
  return searchItemClassMap[type];
}

function getSearchItemClass(type) {
  const searchItemClass = searchItemClassMap[type];
  debugger
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
  componentDidMount() {
    const {
      url,
      type,
      dispatch,
      trigger,
    } = this.props;
    if (url && type) {
      getData({ url, type, dispatch, trigger }).then(() => {
        this.setState({
          loaded: true,
        });
      });
    } else {
      this.setState({
        loaded: false,
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
    return null;
  }
}

export default SearchItemWrap;
