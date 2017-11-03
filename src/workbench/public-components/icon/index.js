import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../../static/style/iconfont/iconfont.css'
import './index.css'

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
  return (
    <i
      className={`iconfont icon-${type} um-icon-${size} ${className}`}
      {...ret}
    />
  )
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
export default Icon;
