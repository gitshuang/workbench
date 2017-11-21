import React, { Component } from 'react';
import {pop_cont} from "./style.css";
import PropTypes from "prop-types";

const propTypes = {
	show:PropTypes.bool.isRequired,
	close:PropTypes.fun
};

class PopDialog extends Component{

	render(){
		
		return(<Modal show = { this.props.show } onHide = { this.props.close } >
              <Modal.Header>
                  <Modal.Title>文件夹类型</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <div className={pop_cont} >
                    {this.props.children}
                </div>
              </Modal.Body>

              <Modal.Footer>

              </Modal.Footer>
        </Modal>)
	}

}

PopDialog.PropTypes = propTypes;
export default PopDialog;