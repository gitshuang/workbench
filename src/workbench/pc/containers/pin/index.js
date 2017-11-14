import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
import onClickOutside from 'react-onclickoutside';

import { pin } from './style.css'
const {requestStart, requestSuccess, requestError} = rootActions;
const { pinDisplayBlock, pinDisplayNone} = workActions;

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
    pinDisplayBlock,
    pinDisplayNone
  }
)
@onClickOutside
class Pin extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { requestStart, requestSuccess, requestError,} = this.props;

  }

  handleClickOutside(evt) {
    const { pinDisplayBlock, pinDisplayNone, pinDisplay  } = this.props;
    if(pinDisplay){
      pinDisplayNone();
    }
  }
  render() {
    const { pinType, pinDisplay } = this.props;
    return (
      <div className={ pin + ' um-css3-hc'} style={{ display: pinDisplay ? 'block' : 'none' }} >
        123
      </div>
    );
  }
}

export default Pin;
