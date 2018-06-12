import React, { Component } from 'react';
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types';
import defaultIcon from 'assets/image/default.png';
import {
  widgetItem,
  title,
  titleRight,
  defaultArea,
  iconImg,
} from './style.css'
import Loading from 'bee/loading';

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

class WidgetItem extends Component {
  static propTypes = {
    data: PropTypes.shape({
      background: PropTypes.string,
      size: PropTypes.number,
      widgetName: PropTypes.string,
      icon: PropTypes.string,
    }),
    clickHandler: PropTypes.func,
    listMeta: PropTypes.shape({
      titleStyle: PropTypes.string,
      imageStyle: PropTypes.string,
      background: PropTypes.string,
    }),
  };
  static defaultProps = {
    data: {},
    clickHandler: () => { },
    listMeta: {},
  };
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    const {
      data: {
        background,
        size,
        widgetName: name,
        icon,
      },
      clickHandler,
      listMeta,
    } = this.props;

    const style = {
      ...widgetStyle[size - 1],
    };
    if (background) {
      style.backgroundImage = `url(${background})`;
    }


    // 取元数据
    const titleStyle = listMeta && listMeta.titleStyle && JSON.parse(listMeta.titleStyle);
    const imageStyle = listMeta && listMeta.imageStyle && JSON.parse(listMeta.imageStyle);
    const backStyle = listMeta && listMeta.background && JSON.parse(listMeta.background);
    const mergeStyle = Object.assign(style, backStyle);

    return (
      <li ref="default_widget" className={`${widgetItem} ${defaultArea}`}
        style={mergeStyle}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        role="presentation"
      >
        <div>
          <div className={title}>
            <div className={titleRight} style={titleStyle}>{name}</div>
          </div>
          <img alt="" src={icon || defaultIcon} className={iconImg} style={imageStyle} />
        </div>
      </li>
    );
  }
}

export default WidgetItem;
