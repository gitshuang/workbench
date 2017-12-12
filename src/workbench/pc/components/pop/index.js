import React, { Component } from 'react';
import PropTypes from "prop-types";
import Modal from 'bee-modal';
import Button from 'bee-button';
import {ButtonBrand,ButtonDefaultAlpha} from 'components/button';
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

  render(){

    let btns = [];
    if(this.props.btns){
        let _data = this.props.data ? this.props.data : this;
        this.props.btns.map(function(da,i){
            let _className = da.className ? da.className : null;
            if(i == 0){
              if(da.fun){
                  btns.push(<ButtonBrand key={"pop_btn"+i} onClick={ () => { da.fun(_data) } } className={`${_className} ${btn}`} >{da.label}</ButtonBrand>);
              }else{
                  btns.push(<ButtonBrand key={"pop_btn"+i} className={`${_className} ${btn}`} >{da.label}</ButtonBrand>);
              }
            }else{
              if(da.fun){
                  btns.push(<ButtonDefaultAlpha key={"pop_btn"+i} onClick={ () => { da.fun(_data) } } className={`${_className} ${btn}`} >{da.label}</ButtonDefaultAlpha>);
              }else{
                  btns.push(<ButtonDefaultAlpha key={"pop_btn"+i} className={`${_className} ${btn}`} >{da.label}</ButtonDefaultAlpha>);
              }
            }
        })
    }
    return(<Modal className={this.props.className?this.props.className:"pop_dialog"} show = { this.props.show } onHide = { this.props.close } >
          <Modal.Header>
              <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
                {this.props.children}
            </div>

            <div className={close} onClick={ this.props.close } >x</div>
          </Modal.Body>

          <Modal.Footer>
              {btns}
          </Modal.Footer>
    </Modal>)}
  }

PopDialog.PropTypes = propTypes;
export default PopDialog;
