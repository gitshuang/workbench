import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { iframe, iframeCont } from './style.css';

const propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  style: PropTypes.shape({}),
};
const defaultProps = {
  url: '',
  title: '',
  style: {}
};

class Iframe extends Component {
  render() {
    const {
      title,
      url,
      style
    } = this.props;
    return (
      <div className={iframeCont} style={style}>
        <iframe id={title} title={title} src={url} className={iframe} />
      </div>
    );
  }
}

Iframe.propTypes = propTypes;
Iframe.defaultProps = defaultProps;
export default Iframe;
