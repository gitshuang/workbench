import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from 'bee/loading';
import { getContext } from '@u';
import WidgetTool from 'public/componentTools';
import {
  widgetItem,
  title,
  titleRight,
} from './style.css';
import { findDOMNode } from 'react-dom'


const widgetStyle = [
  // 小
  {
    width: 176,
  },
  // 中
  {
    width: 360,
  },
  // 大
  {
    width: 360,
    height: 360,
  },
];

function getFetchIe9(url, options = {}) {
  if (window.XDomainRequest) {
    // if(url.indexOf("https") != -1){
    //   url = url.replace(/https/, "http");
    // }
    const fh = url.indexOf('?') === -1 ? '?' : '&';
    // url += fh + "tm=" + new Date().getTime();
    const time = new Date().getTime();
    url = `${fh}tm=${time}`;
    return new Promise((resolve, reject) => {
      const method = options.method || 'get';
      const timeout = options.timeout || 30000;
      const XDR = new XDomainRequest();
      XDR.open(method, url);
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
      XDR.ontimeout = () => Promise.reject(new Error('XDomainRequest timeout'));
      XDR.onerror = () => Promise.reject(new Error('XDomainRequest error'));
      setTimeout(() => {
        XDR.send();
      }, 0);
    });
  }
  return false;
}

function getResultFetch(that, text, callback) {
  that.tool = new WidgetTool(that.props.data.widgetId);
  try {
    const fn = new Function(
      'React',
      'widgetInstance',
      'widgetTool',
      'widgetContext',
      'return ' + text,
    );

    const result = fn(
      React,
      that.props.data,
      that.tool,
      getContext(),
    );
    callback(result);
    // callback(text);
  } catch (e) {
    console.log(e);
  }
}


function getData(url, callback) {
  const browser = navigator.appName;
  const bVersion = navigator.appVersion;
  if (browser === 'Microsoft Internet Explorer' && bVersion.match(/9./i) === '9.') {
    getFetchIe9(url, { method: 'get', timeout: 3000 }).then((text) => {
      getResultFetch(this, text, callback);
    });
  } else {
    fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
    }).then((response) => {
      if (response.ok) {
        return response.text().then((text) => {
          if (text) {
            getResultFetch(this, text, callback);
          } else {
            return Promise.reject(new Error('no data back from api''));
          }
          return false;
        });
      }
      return Promise.reject(new Error('request error''));
    });
  }
}


class WidgetItem extends Component {
  static propTypes = {
    data: PropTypes.shape({
      jsurl: PropTypes.string,
    }),
  }
  static defaultProps = {
    data:{},
    viewport: {
      top: 0,
      height: 0
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      widget: null,
      shouldLoad:false,
    }
  }
  componentWillMount() {}
  componentWillUnmount() {
    if (this.tool && typeof this.tool.destroy === 'function') {
      this.tool.destroy();
    }
  }
  loadWidget(){
    const { data:{ jsurl } } = this.props;
    if (jsurl) {
      getData.call(this, jsurl, (result) => {
        this.setState({
          loaded: true,
          widget: result.default ? result.default : result,
        });
      });
    }
  }
  setShowImage(show){
    this.setState({
      shouldLoad : !!(show)
    })
    this.props.loadOk();
    this.loadWidget();
  }
  updataLoadState(top,height){
    if (this.state.shouldLoad) {
      return;
    }
    var min = this.props.viewport.top;
    var max = this.props.viewport.top + this.props.viewport.height;

    if ((min <= (top + height) && top <= max )) {
      this.setShowImage(true);
    }
  }
  componentDidMount(){
    if( !this.state.shouldLoad && this.props.viewport ){
      var el = findDOMNode(this.refs.normal_widget);
      this.updataLoadState(el.offsetTop, el.offsetHeight)
    }
  }
  componentDidUpdate(prevProps){
    if( !this.state.shouldLoad && prevProps.viewport ){
      var el = findDOMNode(this.refs.normal_widget);
      this.updataLoadState(el.offsetTop, el.offsetHeight)
    }
  }

  render() {
    const {
      data: {
        background,
        size,
        widgetName: name,
      },
    } = this.props;
    const { widget: Widget, loaded } = this.state;
    let contentElm;
    if (loaded) {
      contentElm = (<Widget />);
    } else {
      contentElm = (<Loading container={this} show />);
    }

    const style = {
      ...widgetStyle[size - 1],
    };
    if (background) {
      style.backgroundImage = `url(${background})`;
    }
    return (
      <li ref="normal_widget" className={widgetItem} style={style} >
      {this.state.shouldLoad?(
        <div>
        <div className={title}>
          <div className={titleRight}>{name}</div>
        </div>
        {contentElm}
        </div>):(<Loading container={this} show={true} />)}
      </li>
    );
  }
}

export default WidgetItem;
