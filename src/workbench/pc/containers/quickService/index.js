import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { service } from './style.css';
import onClickOutside from 'react-onclickoutside';
import actions from 'store/root/actions';

const {
  changeQuickServiceHidden,
  } = actions;

class QuickServiceContainer extends Component {

  handleClickOutside(evt) {
    const {changeQuickServiceHidden,quickServiceDisplay } = this.props;
    if(quickServiceDisplay){
      changeQuickServiceHidden();
    }
  }

  render() {
    const { quickServiceDisplay, serviceList } = this.props;
    return (
      <div className={service} style={{ display: quickServiceDisplay ? 'block' : 'none' }} >
        <h4>相关服务</h4>
        <ul className="clearfix">
          {
            serviceList.map((service, i) => <li key={i} >{service.name}</li>)
          }
        </ul>
        <button className="btn">全部服务</button>
      </div>
    );
  }
}

export default connect(mapStateToProps(
  'quickServiceDisplay',
  'serviceList',

),
  {
    changeQuickServiceHidden,
  }
)(onClickOutside(QuickServiceContainer));
