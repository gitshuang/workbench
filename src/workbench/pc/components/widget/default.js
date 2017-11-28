import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'tinper-bee';
import {
  widgetItem,
  title,
  title_left,
  title_right,
  content,
} from './style.css'

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

class WidgetItem extends Component {
  render() {
    const {
      data: {
        background,
        widgetId: id,
        size,
        widgetName: name,
        icon,
      },
      clickHandler,
    } = this.props;

    return (
      <li className={widgetItem}
        style={{...widgetStyle[size], backgroundImage: background }}
        onClick={clickHandler} >
        <div className={title}>
          <div className={title_left}><img src={icon} /></div>
          <div className={title_right}>{name}</div>
        </div>
      </li>
    );
  }
}

export default WidgetItem;
