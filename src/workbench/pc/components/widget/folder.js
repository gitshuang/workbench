import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  widgetItem,
  title,
  file_context,
  title_left,
  file_icon,
  title_right,
  context,
} from './style.css'

class FolderWidget extends Component {
  render() {
    const {
      data,
      clickHandler,
    } = this.props;
    const {
      widgetName: name,
      children,
    } = data;
    return (
      <li className={widgetItem} onClick={ clickHandler } >
        <div className={title}>
          <div className={[title_left, file_icon].join(' ')}></div>
          <div className={title_right}>{name}</div>
        </div>
        <div className={[context, file_context].join(' ')} >
          { children.map(() => (<div></div>)).slice(0, 9) }
        </div>
      </li>
    )
  }
}

export default FolderWidget;
