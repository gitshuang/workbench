import React, { Component } from 'react';
import {select,selectedli} from "./style.css";
import PropTypes from "prop-types";
import Icon from 'bee-icon';

class Select extends Component{

	constructor(props) {
        super(props);
        let data = [];
        Object.assign(data,props.data);
        this.state = {
        	data
        }
    }

    onClick = (e,obj) =>{
    	this.state.data.map(function(da,i){
    		da.select = false;
    	})

    	this.state.data.map(function(da,i){
    		if(da.id == obj.id){
    			da.select = true;
    		}
    	})

    	this.setState({
    		...this.state
    	})
    	this.props.onClick(e,obj);
    }

    render() {
    	let self = this;
    	let lis = [];
    	if(this.state.data){
	    	this.state.data.map(function(da,i){
	    		if(da.select){
	    			lis.push(<li key={da.id} className={selectedli} onClick={(e)=>{self.onClick(e,da)}} >{da.value}</li>);
	    		}else{
	    			lis.push(<li key={da.id} onClick={(e)=>{self.onClick(e,da)}} >{da.value}</li>);
	    		}
	    	})
    	}
    	return (this.props.show ? <ul className={select}>{lis}</ul> : null);
   }
}
export default Select;