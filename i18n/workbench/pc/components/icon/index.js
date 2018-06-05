import React, {Component} from 'react';
import PropTypes from 'prop-types';
import types from './style.css';//font字体库
import sizes from './index.css';

const propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};
const defaultProps = {
  className: '',
  type: '',
  size: 'md'
};

function Icon(props) {
  let {type, className, size, ...ret} = props;
  const sizeClassName = sizes[size] || '';
  const typeClassName = types[`icon-${type}`] || '';
  const classicon = types[`iconfont`];
  return (
    <i
      className={`iconfont ${classicon} ${typeClassName} ${sizeClassName} ${className}`}
      {...ret}
    />
  )
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;

export default Icon;
