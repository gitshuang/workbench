import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import Breadcrumbs from 'components/breadcrumb';
import Header from 'containers/header';
import CreateEnter from './createEnter';
import { pageEnterprise, enterTitle, enterCont, hr, hr2 } from './style.css';

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    {
      namespace: 'home',
    },
  ),
  {},
)
class Enterprise extends Component {
  static propTypes = {
    history: PropTypes.shape({
      goBack: PropTypes.func,
      replace: PropTypes.func,
    }),
    userInfo: PropTypes.shape({
      allowTenants: PropTypes.array,
    }),
  };
  static defaultProps = {
    history: {},
    userInfo: {},
  };
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goBack = () => {
    this.props.history.goBack();
  }

  goHome = () => {
    this.props.history.replace('');
  }

  render() {
    const { userInfo } = this.props;
    return (
      <div>
        <div className="header um-header">
          <Header
            iconName = "computer"
            onLeftClick={this.goHome}
          >
            <div>
              <span>$i18n{index.js0}$i18n-end</span>
            </div>
          </Header>
          <div className="appBreadcrumb">
            <Breadcrumbs data={[{ name: '$i18n{index.js1}$i18n-end' }]} goback={this.goBack} />
          </div>
        </div>
        
        <div className={`${pageEnterprise} content`}>
          <div className={enterTitle} >$i18n{index.js2}$i18n-end</div>
          <hr className={hr} />
          <div className={enterCont} >
            <CreateEnter userInfo={userInfo} />
          </div>
          <hr className={`${hr} ${hr2}`} />
        </div>
      </div>
    );
  }
}
export default Enterprise;

