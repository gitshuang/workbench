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
          {
            serviceList.map(({
              lebalId,
              children,
              lebalName,
            }) => (
              <div key={lebalId} className={serviceGroup}>
                <h4>{lebalName}</h4>
                <ul className="clearfix">
                  {
                    children.map(({
                      applicationCode,
                      applicationIcon,
                      applicationId,
                      applicationName,
                    }) => (
                      <div key={applicationCode} className={contentDiv}>
                        <li><img src={applicationIcon}/></li>
                        <div className={content}>{applicationName}</div>
                      </div>
                    ))
                  }
                </ul>
              </div>
            ))
          }
        </div>
        <div className={`${serviceBtn} ` }><button className="btn" onClick={this.openApplication}>全部服务</button></div>
      </div>
    );
  }
}

export default QuickServiceContainer;
