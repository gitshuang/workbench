import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { serviceContainer,service,serviceGroup,serviceBtn,contentDiv,content } from './style.css';
import onClickOutside from 'react-onclickoutside';
import actions from 'store/root/actions';
import { withRouter } from 'react-router-dom';

const {changeQuickServiceHidden,} = actions;

@withRouter
@connect(
  mapStateToProps(
    'serviceList',
    'quickServiceDisplay',
  ),
  {
    changeQuickServiceHidden,
  }
)
@onClickOutside
class QuickServiceContainer extends Component {
  handleClickOutside() {
    const { changeQuickServiceHidden, quickServiceDisplay } = this.props;
    if(quickServiceDisplay){
      changeQuickServiceHidden();
    }
  }

  openApplication = () => {
    const { changeQuickServiceHidden } = this.props;
    changeQuickServiceHidden();
    this.props.history.push('/application');
  }

  render() {
    const { serviceList } = this.props;
    return (
      <div className={serviceContainer}>
        <div className={service} >
          <div className={serviceGroup}>
            <h4>分组一</h4>
            <ul className="clearfix">
              {
                serviceList.map((service, i) => (
                  <div key={i} className={contentDiv}><li>{service.name}</li><div className={content}>{service.name}</div></div>
                ))
              }
            </ul>
          </div>
          <div className={serviceGroup}>
            <h4>分组二</h4>
            <ul className="clearfix">
              {
                serviceList.map((service, i) => (
                  <div key={i} className={contentDiv}><li>{service.name}</li><div className={content}>{service.name}</div></div>
                ))
              }
            </ul>
          </div>
        </div>
        <div className={`${serviceBtn} ` }><button className="btn" onClick={this.openApplication}>全部服务</button></div>
      </div>
    );
  }
}

export default QuickServiceContainer;
