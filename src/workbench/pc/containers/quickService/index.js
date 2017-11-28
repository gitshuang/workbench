import React, { Component, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mapStateToProps } from '@u';
import { serviceContainer,service,serviceGroup,serviceBtn,contentDiv,content } from './style.css';
import onClickOutside from 'react-onclickoutside';
import actions from 'store/root/actions';
import { withRouter } from 'react-router-dom';

const {changeQuickServiceHidden} = actions;

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
  openAllAppList() {
    const { changeQuickServiceHidden } = this.props;
    changeQuickServiceHidden();
    this.props.history.push('/application');
  }
  openApp(applicationCode) {
    this.props.history.push(`/app/${applicationCode}`);
  }
  render() {
    const { serviceList } = this.props;
    return (
      <div className={serviceContainer}>
        <div className={service} >
          <ul className="clearfix">
          {
            serviceList.map(({
              applicationCode,
              applicationIcon,
              applicationId,
              applicationName,
            }) => (
              <div key={applicationCode} className={contentDiv} onClick={this.openApp.bind(this, applicationCode)}>
                <li><img src={applicationIcon}/></li>
                <div className={content}>{applicationName}</div>
              </div>
            ))
          }
          </ul>
        </div>
        <div className={serviceBtn}><button className="btn" onClick={this.openAllAppList}>全部服务</button></div>
      </div>
    );
  }
}

export default QuickServiceContainer;
