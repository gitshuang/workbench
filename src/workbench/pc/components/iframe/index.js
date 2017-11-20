import React, { Component } from 'react';
import {iframe} from "./style.css";
import PropTypes from "prop-types";

const propTypes = {
	url:PropTypes.string,
	// messageData:PropTypes.object,//message 数据
	// messType:PropTypes.string,//message 事件key
	// messageHandler:PropTypes.func //回调函数
}

class Iframe extends Component{

	constructor(props) {
        super(props);
    }

    render() {

       return (<iframe ref = {e => { this.iframe = e; }} title={this.props.title} src={this.props.url} className={iframe} ></iframe>);
   }

}

Iframe.propTypes = propTypes;

export default Iframe;