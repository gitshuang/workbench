import React, { Component } from 'react';
import {option_ul} from "./style.css";
import PropTypes from "prop-types";
import Icon from 'bee-icon';

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
    	return (
	    	<ul className={option_ul}>
	    		<li><Icon type="uf-pencil" /></li>
	    		<li><Icon type="uf-del" /></li>
	    		<li><Icon type="uf-add-c-o" /></li>
	    </ul>);
   }

}

Iframe.propTypes = propTypes;

export default Iframe;