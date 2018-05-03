import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  widgetItem,
  title,
  titleRight,
  fileNum,
  fileTitleRight,
  widgetFileItem,
} from './style.css';

const style = {
  position: 'absolute',
  right: '11px',
  bottom: '9px',
  color: '#fff',
};

class FolderWidget extends Component {
  static propTypes = {
    data: PropTypes.shape({
      background: PropTypes.string,
      size: PropTypes.number,
      widgetName: PropTypes.string,
      icon: PropTypes.string,
      type: PropTypes.number,
    }),
    clickHandler: PropTypes.func,
  };
  static defaultProps = {
    data: {},
    clickHandler: () => { },
  };
  render() {
    const {
      data,
      clickHandler,
    } = this.props;
    const {
      widgetName: name,
      children,
      type,
    } = data;
    return (
      <li
        className={`${widgetItem} ${type === 2 ? widgetFileItem : ''}`}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        role="presentation"
      >
        <div className={title}>
          <div className={`${titleRight} ${fileTitleRight}`}>{name}</div>
        </div>
        <div className={fileNum} style={style}>
          ({children.length})
        </div>
      </li>
    );
  }
}

export default FolderWidget;
