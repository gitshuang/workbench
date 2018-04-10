import React, { Component } from 'react';
import {iframe,iframe_cont} from "./style.css";
import PropTypes from "prop-types";

const propTypes = {
  url:PropTypes.string,
}

class Iframe extends Component{
  render() {
    const {
      title,
      url,
    } = this.props;
    return (<div className={iframe_cont}><iframe id={title} title={title} src={url} className={iframe} /></div>);
  }
}

Iframe.propTypes = propTypes;

export default Iframe;
