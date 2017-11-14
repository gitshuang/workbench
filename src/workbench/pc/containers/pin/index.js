import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';
import workActions from 'store/root/work/actions';
import onClickOutside from 'react-onclickoutside';


const {requestStart, requestSuccess, requestError} = rootActions;
const { pinDisplayBlock, pinDisplayNone} = workActions;

@connect(mapStateToProps(
  'pinType',
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
    const { pinDisplayBlock, pinDisplayNone  } = this.props;
    pinDisplayNone();
  }
  render() {
    const { pinType } = this.props;
    return (
      <div className={ 'um-css3-hc'} style={{ display: pinType ? 'block' : 'none' }} >
        123
      </div>
    );
  }
}

export default Pin;
