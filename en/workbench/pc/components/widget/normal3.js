import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import Loading from 'bee/loading';
import { getContext } from '@u';
import WidgetTool from 'public/componentTools';
import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
} from './style.css';

const widgetStyle = [
  // 小
  {
    width: 176
  },
  // 中
  {
    width: 360
  },
  // 大
  {
    width: 360,
    height: 360
  }
];

  function getFetchIe9(url, options = {}){
    if (window.XDomainRequest) {
      // if(url.indexOf("https") != -1){
      //   url = url.replace(/https/, "http");
      // }
      let fh = url.indexOf("?") == -1?"?":"&";
      url += fh+"tm="+new Date().getTime();
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
          return reject({});
        };
        XDR.onprogress = () => {};
        XDR.ontimeout = () => reject('XDomainRequest timeout');
        XDR.onerror = () => reject('XDomainRequest error');
        setTimeout(() => {
          XDR.send();
        }, 0);
      });
    } else {
    }
  }

  function getResultFetch(_this,text, callback) {
    _this.tool = new WidgetTool(_this.props.data.widgetId);
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
        _this.props.data,
        _this.tool,
        getContext(),
      );
      callback(result);
    } catch (e) {
      console.log(e);
    } 
  }


  function getData(url, callback) {
    let browser=navigator.appName;
    let b_version=navigator.appVersion;
    let _resultPremise = null;
    if(browser=="Microsoft Internet Explorer" && b_version.match(/9./i)=="9.")
    {
      getFetchIe9(url,{method:"get",timeout:3000}).then((text) => {
        getResultFetch(this,text, callback);
      });
    }else{
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
              getResultFetch(this,text, callback);
            } else {
              return Promise.reject(new Error('no data back from api''));
            }
          });
        }
        return Promise.reject(new Error('request error''));
      });
    }
  }


class WidgetItem extends Component {
  static propTypes = {
    data: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      widget: null,
    }
  }
  componentWillMount() {
    const { data:{ jsurl } } = this.props;
    if (jsurl) {
      getData.call(this, jsurl, (result) => {
        this.setState({
          loaded: true,
          widget: result.default ? result.default : result,
        });
      })
    }
  }
  componentWillUnmount() {
    if (this.tool && typeof this.tool.destroy === 'function') {
      this.tool.destroy();
    }
  }
  render() {
    const {
      data: {
        background,
        widgetId: id,
        size,
        widgetName: name,
        icon,
      }
    } = this.props;
    const { widget: Widget, loaded } = this.state;
    let contentElm;
    if (loaded) {
      contentElm = (<Widget/>);
    } else {
      contentElm = (<Loading container={this} show={true} />);
    }

    const style = {
      ...widgetStyle[size - 1],
    };
    if (background) {
      style.backgroundImage = `url(${background})`;
    }

    return (
      <li className={widgetItem} style={style} >
        <div className={title}>
          <div className={title_right}>{name}</div>
        </div>
        {contentElm}
      </li>
    );
  }
}

export default WidgetItem;
