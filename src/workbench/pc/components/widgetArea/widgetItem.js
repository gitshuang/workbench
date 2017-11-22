import React, {
  Component
} from 'react';
import ReactDOM from 'react-dom';
import { Loading } from 'tinper-bee';
import Icon from 'bee-icon';
import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
} from './style.css'

const widgetStyle = {
  sm: {
    width: 176
  },
  lg: {
    width: 360
  },
  xg: {
    width: 360,
    height: 360
  }
};

function getData(url, callback) {
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
          try {
            var fn = new Function('React', 'return ' + text);
            var result = fn(React);
            callback(result)
          } catch (e) {
            console.log(e);
          }
        } else {
          return Promise.reject(new Error('接口未返回数据'));
        }
      });
    }
    return Promise.reject(new Error('请求失败'));
  });
}


class WidgetItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      widget: null,
    }
  }
  componentWillMount() {
    const { data: { jsurl } } = this.props;
    if (jsurl) {
      getData(jsurl, (result) => {
        this.setState({
          loaded: true,
          widget: result.default
        })
      })
    }
  }
  render() {
    const {
      data: {
        id,
        type,
        title: widgetTitle,
        optionTitle,
        jsurl,
      }
    } = this.props;
    const { widget: Widget, loaded } = this.state;
    let contentElm;
    if (loaded) {
      contentElm = (
        <div className={content} ref={(para) => { this.contain = para }}>
          <Widget/>
        </div>
      );
    } /*else if (id == '1101') {
      contentElm = (
        <div className={content} ref={(para) => { this.contain = para }}>
          <Loading container={this.contain} show={true} />
        </div>
      );
    }*/

    return (
      <li className={widgetItem} style={widgetStyle[type]} >
        <div className={title}>
          <div className={title_left}><Icon type="uf-add-c-o" /></div>
          <div className={title_right}>{widgetTitle}</div>
        </div>
        {contentElm}
      </li>
    );
  }
}

export default WidgetItem;
