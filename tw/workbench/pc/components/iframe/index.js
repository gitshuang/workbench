import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { iframe } from './style.css';


const propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};
const defaultProps = {
  url: '',
  title: '',
};

class Iframe extends Component {
  render() {
    const {
      title,
      url,
    } = this.props;
    return (<iframe id={title} title={title} src={url} className={iframe} />);
  }
}

Iframe.propTypes = propTypes;
Iframe.defaultProps = defaultProps;

export default Iframe;
