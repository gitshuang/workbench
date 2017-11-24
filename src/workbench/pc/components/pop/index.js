import React, { Component } from 'react';
import PropTypes from "prop-types";
import Modal from 'bee-modal';
import Button from 'bee-button';

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
            if(da.fun){
                btns.push(<Button key={"pop_btn"+i} onClick={ () => { da.fun(_data) } } className={_className} >{da.label}</Button>);
            }else{
                btns.push(<Button key={"pop_btn"+i} className={_className} >{da.label}</Button>);
            }
        })
    }

                return(<Modal show = { this.props.show } onHide = { this.props.close } >
              <Modal.Header>
                  <Modal.Title>{this.props.title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div>
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
