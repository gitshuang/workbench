import React, { Component } from 'react';
import {pop_cont} from "./style.css";
import PropTypes from "prop-types";
import Modal from 'bee-modal';
import Button from 'bee-button';

const propTypes = {
  title:"",
	show:PropTypes.bool.isRequired,
  btns:[{label:"",fun:null,className:""},{label:"",fun:null,className:""}],   //设置操作按钮
	close:PropTypes.fun,

};

class PopDialog extends Component{

  fun = ()=>{

  }

	render(){

    let btns = [];
    if(this.props.btns){

        this.props.btns.map(function(da,i){
            let _fun = da.fun ? da.fun : fun;
            let _className = da.className ? da.className : null;

            btns.push(<Button key={"pop_btn"+i} onClick={ _fun } className={_className} >{da.label}</Button>);
        })
    }
		
		return(<Modal show = { this.props.show } onHide = { this.props.close } >
              <Modal.Header>
                  <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className={pop_cont} >
                    {this.props.children}
                </div>
              </Modal.Body>

              <Modal.Footer>
                  {btns}
              </Modal.Footer>
        </Modal>)
	}

}

PopDialog.PropTypes = propTypes;
export default PopDialog;