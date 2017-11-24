import React, { Component } from 'react';
import {selectCont,button} from "./style.css";
import PropTypes from "prop-types";
import Icon from 'bee-icon';
import Select from 'components/select';

class index1 extends Component{

	constructor(props) {
        super(props);

    }

    onClick = (e,da) =>{

        debugger;
    }

    render() {

        let array = [
            {id:"1001",value:"123"},
            {id:"1002",value:"123"},
            {id:"1003",value:"123"},
            {id:"1004",value:"123"}
        ]
 
    	return (
            <div className={selectCont}>
                <div className={button}></div>
                <Select data={array} show={true} onClick={this.onClick}/>
            </div>
            );
   }
}

export default index1;