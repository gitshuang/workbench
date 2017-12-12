import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapStateToProps } from '@u';
import rootActions from 'store/root/actions';

import Header from 'containers/header';
import BreadcrumbContainer from 'containers/breadcrumb';
import ServiceClassify from 'containers/serviceClassify';

import {header,um_content,appBreadcrumb} from './style.css';

const {requestStart, requestSuccess, requestError} = rootActions;
// const {changeUserInfoDisplay, getWorkList} = homeActions;

@withRouter
@connect(
  mapStateToProps(
    'widthBrm',
    'current',
    'domainName',
    {
      namespace: 'work'
    }
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
  }
)

class Application extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.replace('');
  }

  render() {
    return (
      <div className="um-win">
        <div className={header}>
          <div className="um-header">
            <Header onLeftClick={ this.goBack.bind(this) } iconName={"home"} leftContent={"返回"}>
              <div>
                <span>全部应用及服务</span>
              </div>
            </Header>
            <div className={appBreadcrumb}><BreadcrumbContainer/></div>
          </div>
        </div>
        <div className={um_content}>
          <ServiceClassify />
        </div>
      </div>
    );
  }
}

export default Application;
