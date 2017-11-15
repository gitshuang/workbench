import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import { mapStateToProps } from '@u';
/*  actions  */
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
/*  comp */
import Button from 'bee-button';
/*  style */
import {
  pin,
  bc,
  title,
  content,
  footer
} from './style.css'
const {requestStart, requestSuccess, requestError} = rootActions;
const { pinDisplayNone, setPinAdd } = workActions;

@connect(mapStateToProps(
  'pinType',
  'pinDisplay',
  {
    "namespace":"work"
  }
  ),

  {
    requestStart,
    requestSuccess,
    requestError,
    pinDisplayNone,
    setPinAdd,
  }
)
@onClickOutside
class Pin extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isGroup : false,
    }
  }

  componentDidMount() {
    const { requestStart, requestSuccess, requestError,} = this.props;

  }

  handleClickOutside(evt) {
    const {  pinDisplayNone, pinDisplay  } = this.props;
    if(pinDisplay){
      pinDisplayNone();
    }
  }

  addGroup = () => {
    this.setState({
      isGroup: true
    });
  }

  confirmFn = () => {
    const { requestError, pinDisplayNone, setPinAdd } = this.props;
    setPinAdd().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
      }
      pinDisplayNone();
    });
  }

  cancelFn = () => {
    const { pinDisplayNone } = this.props;
    pinDisplayNone();
  }

  renderContent = () => {
    let content;
    if (this.state.isGroup){
      content = <div>
        <input type="text"/>
      </div>
    }else{
      content = <div>111111111111111111111</div>
    }
    return content;
  }

  render() {
    const { pinType, pinDisplay } = this.props;
    return (
      <div className={ pin + ' um-css3-hc'} style={{ display: pinDisplay ? 'block' : 'none' }} >
        <div className="um-box">
          <div className={bc}>
            <img src="../" alt="" />
          </div>
          <p>工作页名称</p>
        </div>
        <div className={title}>
          添加到：
        </div>
        <div className={ content + " um-content"}>
          {this.renderContent()}
        </div>
        <div className={footer + " um-box-justify"}>

          <div>
            <Button onClick={this.addGroup}>添加分组</Button>
          </div>
          <div>
            <Button style={{marginRight:"5px"}} onClick={ this.confirmFn }>确定</Button>
            <Button onClick={this.cancelFn}>取消</Button>
          </div>
        </div>

      </div>
    );
  }
}

export default Pin;
