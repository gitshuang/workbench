import React, {Component} from 'react';
import PropTypes from "prop-types";
import Button from 'bee-button';
import Loadingstate from 'bee-loading-state';

import {default_btn,default_font,active_btn} from './style_danger.css';

const propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  onClick:PropTypes.fun,
  data:PropTypes.object
}

// type default
class ButtonDanger extends Component {

    constructor(props, context) {
      super(props, context);
      this.state = {
        active:false
      }
    }

    btnClick = (e) =>{
      let _b = this.state.active?false:true;
      this.setState({
          active:_b
      })
      if(this.props.onClick){
        this.getPropsClick();
      }
    }

    getPropsClick(){
      if(this.props.data){
        this.props.onClick(e,this.props.data);  
      }else{
        this.props.onClick(e);
      }
    }

    render() {
      let label = this.props.label?this.props.label:"按钮";

      let _btn = <div className={`${default_btn} ${default_font} `} onClick={this.btnClick} >{label}</div>;
      if(this.state.active){
        _btn = <div className={`${active_btn} ${default_btn} ${default_font} `} onClick={this.btnClick} >{label}</div>
      }else{
        _btn = <div className={`${default_btn} ${default_font}`} onClick={this.btnClick} >{label}</div>
      }
      return (_btn);
    }
}

ButtonDanger.PropTypes = propTypes;
export default ButtonDanger