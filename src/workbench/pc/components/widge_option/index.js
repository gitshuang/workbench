import React, { Component } from 'react';
import {option_ul} from "./style.css";
import PropTypes from "prop-types";
import Icon from 'bee-icon';

const propTypes = {
	delete:PropTypes.fun,
	add:PropTypes.fun,
	edit:PropTypes.fun,
	data:PropTypes.object
}

class WidgeOption extends Component{

	constructor(props) {
        super(props);
    }

    render() {
    	return (
	    	<ul className={option_ul}>
	    		<li onClick={ ()=> {this.props.edit(this.props.data)} } ><Icon type="uf-pencil"/></li>
	    		<li onClick={ ()=> {this.props.delete(this.props.data)} } ><Icon type="uf-del" /></li>
	    		<li onClick={ ()=> {this.props.add(this.props.data)} }><Icon type="uf-add-c-o" /></li>
	    </ul>);
   }

}

WidgeOption.propTypes = propTypes;
export default WidgeOption;