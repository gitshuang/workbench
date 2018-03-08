import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import Modal from 'bee/modal';
import { IS_REACT_16, IS_IE } from '@u';
import Icon from 'components/icon';
import {ButtonBrand,ButtonWarning,ButtonDefaultAlpha} from 'components/button';
import { btn, closeBtn } from './style.css';
import { setTimeout } from 'timers';

class PopDialog extends Component{
  static propTypes = {
    title: PropTypes.string,
    show: PropTypes.bool.isRequired,
    btns: PropTypes.array,
    close: PropTypes.any,
    data: PropTypes.any,
  }

  btnClick = (evt, da) => {
    let e = evt || window.event; 
    window.event?e.cancelBubble=true:e.stopPropagation(); 
    let _data = this.props.data ? this.props.data : this;
    if(da.fun){
      da.fun(_data,e)
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
    return (<Modal className={`${IS_IE?'ie9_pop':''} ${this.props.className?this.props.className:"pop_dialog"}`} backdrop={this.props.backdrop?false:true} show = { this.props.show } onHide = { this.props.close } >
          <Modal.Header>
              <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
                {this.props.children}
            </div>

            <div className={`${closeBtn} close`} onClick={ this.props.close } ><Icon type="error3" /></div>
          </Modal.Body>

          <Modal.Footer>
              {_btns}
          </Modal.Footer>
    </Modal>)}
}

class DialogComponent extends Component{
  static defaultProps = {
    title: '',
    content: '',
    btns: [],
    show: true,
  }
  btnClickMaker(fn) {
    const { close } = this.props;
    if (fn && typeof fn === 'function') {
      return () => {
        fn(close);
      };
    } else {
      return close;
    }
  }
  render(){
    const {
      title,
      content,
      show,
      btns,
      close,
    } = this.props;
    return(
      <Modal className="pop_dialog" backdrop={true} show={show}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {content}
          </div>
          <div className={closeBtn} onClick={close} >
            <Icon type="error3" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          {
            btns.map(({ type, label, fun }, i) => {
              if (!label) {
                return null;
              }
              let BtnComponent = ButtonDefaultAlpha;
              switch(type) {
                case 'brand':
                  BtnComponent = ButtonBrand;
                  break;
                case 'warning':
                  BtnComponent = ButtonWarning;
                  break;
                default:
                  break;
              }
              return (
                <BtnComponent
                  key={i}
                  className={btn}
                  onClick={this.btnClickMaker(fun)} >
                  {label}
                </BtnComponent>
              );
            })
          }
        </Modal.Footer>
      </Modal>
    )
  }
}

class Dialog {
  constructor(options) {
    this.div = document.createElement('div');
    this.props = {
      ...options,
      close: options.close ? options.close.bind(this) : this.close.bind(this),
    };
    document.body.appendChild(this.div);
    this.render();
  }
  close = () => {
    const {
      props,
      props: {
        onClose,
      },
    } = this;
    if (typeof onClose === 'function' && !onClose()) {
      return;
    }
    props.show = false;
    var pro =  new Promise(
      (resolve) => {
        this.render();
        setTimeout(() => {
          resolve();
        }, 1000);
      }
    );
    pro.then(this.destroy.bind(this));
  }
  render = () => {
    const { props, div } = this;
    ReactDOM.render(<DialogComponent { ...props } />, div);
    return this;
  }
  destroy = () => {
    const {
      div,
    } = this;
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
  }
}

let globalDialogInstance;
let dialogIsOpen = false;
function makeGlobalDialogInstance(options) {
  globalDialogInstance = new Dialog(options)
}
function openGlobalDialog(options) {
  // if (dialogIsOpen) {
  //   return;
  // }
  // dialogIsOpen = true;
  const dialogFactory = makeGlobalDialogInstance.bind(null, options);
  if (globalDialogInstance) {
    globalDialogInstance.destroy();
  }
  dialogFactory();
}
function closeGlobalDialog() {
  if (globalDialogInstance) {
    globalDialogInstance.close();
  }
}
// window.dialog = dialog;
export default PopDialog;
export {
  openGlobalDialog,
  closeGlobalDialog,
};
