import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'bee-button';
import Loadingstate from 'bee-loading-state';

import {btn,default_btn,active_btn,disabled_btn} from './style_check_close.css';

const propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onClick:PropTypes.fun,
  data:PropTypes.object
}

// type default
class ButtonCheckClose extends Component {

    constructor(props, context) {
      super(props, context);

      this.state = {
        type:props.type?props.type:"",
        disabled:props.disabled?true:false,
      }
    }

    btnClick = (e) =>{
      this.state.type = "active";
      this.setState({
         type:"active"
      },()=>{
        if(this.props.onClick){
            this.getPropsClick(e);
        }
      })
    }

    getPropsClick(e){
      if(this.props.data){
        this.props.onClick(e,this.props.data);
      }else{
        this.props.onClick(e);
      }
    }

    render() {
      let {children,className,disabled} = this.props;
      let _btn = <div className={`${btn} ${default_btn} ${this.props.className} `} onClick={this.btnClick} >{children}</div>;
      if(disabled){
        _btn = <div className={`${btn} ${disabled_btn}`} >{children}</div>
      }else{
        switch(this.state.type){
            case "active"://active
            debugger;
            _btn = <div className={`${btn} ${active_btn}`} onClick={this.btnClick} >{children}</div>
            default:
        }
      }
      return (_btn);
    }
}

ButtonCheckClose.PropTypes = propTypes;
export default ButtonCheckClose