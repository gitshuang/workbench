import React, { Component } from 'react';
import PropTypes from "prop-types";
import {ButtonDefaultAlpha} from "components/button";
import {button_group} from './style.css';

const propTypes = {
  label:"",
  dataItem:[]
};

class ButtonGroup extends Component{

  constructor(props) {
    super(props);
    this.state = {
      
    }
  } 

  render(){
    let {label,dataItem,fun} = this.props;
    return(<div className={button_group} >
    {
      dataItem.forEach((da,i)=>{
        return(<ButtonDefaultAlpha onClick={()=>{this.props.onClick(da)}} >取消</ButtonDefaultAlpha>);
      })
    }
    </div>);
  }
}
ButtonGroup.PropTypes = propTypes;
export default ButtonGroup;
