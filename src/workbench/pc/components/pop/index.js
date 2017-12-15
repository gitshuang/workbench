import React, { Component } from 'react';
import PropTypes from "prop-types";
import Modal from 'bee-modal';
import Button from 'bee-button';
import Icon from 'components/icon';
import {ButtonBrand,ButtonWarning,ButtonDefaultAlpha} from 'components/button';
import {btn,close} from './style.css';

const propTypes = {
  title:"",
        show:PropTypes.bool.isRequired,
  btns:[{label:"",fun:null,className:""},{label:"",fun:null,className:""}],   //设置操作按钮
        close:PropTypes.fun,
  data:null
};

class PopDialog extends Component{

  constructor(props) {
        super(props);
  }

  btnClick =(e,da)=>{
    let _data = this.props.data ? this.props.data : this;
    if(da.fun){
      da.fun(_data)
    }
  }

  render(){

    let _btns = [];
    if(this.props.btns){
        let _data = this.props.data ? this.props.data : this;
        this.props.btns.map((da,i)=>{
            let _className = da.className ? da.className : null;
            let _defultAlphaButton = <ButtonDefaultAlpha key={"pop_btn"+i} onClick={ (e) => { this.btnClick(e,da) } } className={`${_className} ${btn}`} >{da.label}</ButtonDefaultAlpha>;
            let _button =  null;
            if(this.props.type == "delete"){
               _button = i===0?<ButtonWarning key={"pop_btn"+i} onClick={ (e) => { this.btnClick(e,da)} } className={`${_className} ${btn}`} >{da.label}</ButtonWarning>:_defultAlphaButton;
            }else{
               _button = i===0?<ButtonBrand key={"pop_btn"+i} onClick={ (e) => { this.btnClick(e,da) } } className={`${_className} ${btn}`} >{da.label}</ButtonBrand>:_defultAlphaButton;
            }
            _btns.push(_button);
        })
    }
    return(<Modal className={this.props.className?this.props.className:"pop_dialog"} backdrop={this.props.backdrop?false:true} show = { this.props.show } onHide = { this.props.close } >
          <Modal.Header>
              <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
                {this.props.children}
            </div>

            <div className={`${close} close`} onClick={ this.props.close } ><Icon type="error3" /></div>
          </Modal.Body>

          <Modal.Footer>
              {_btns}
          </Modal.Footer>
    </Modal>)}
  }

PopDialog.PropTypes = propTypes;
export default PopDialog;
