import React, { Component } from 'react';
import {pop_cont} from "./style.css";
import PropTypes from "prop-types";
import WidgetArea from 'components/widgetArea';
import WidgeOption from 'components/widge_option';
import { WidgetCont, WidgetTitle,item } from './style.css';

class WidgeList extends Component{

     constructor(props) {
        super(props);

        this.state = {
         
        }
    }

	render(){

		let da = this.props.data;

		return(
		<div name={"nav"+da.id} className={item} >
            {
            	this.props.index == 0 ? null : <div className={WidgetTitle} >
                    <div>{da.name}</div>
                    <div><WidgeOption /></div>
                </div>
            }
            <div className={WidgetCont} name={da.id} >
                <WidgetArea data={da.widgeList} change={this.props.change} > </WidgetArea>
            </div>
        </div>)
	}

}

// PopDialog.PropTypes = propTypes;
export default WidgeList;