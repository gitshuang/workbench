import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';

import Breadcrumbs from 'components/breadcrumb';
import Header from 'containers/header';
import CreateEnter from './createEnter';
import { pageEnterprise, enterTitle, enterCont, hr, hr2, appBreadcrumb, homeNone } from './style.css';

@withRouter
@connect(
  mapStateToProps(
    'userInfo',
    'metaData',
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
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    userInfo: PropTypes.shape({
      allowTenants: PropTypes.array,
    }),
  };
  static defaultProps = {
    history: {},
    userInfo: {},
    match: {},
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
    const { userInfo: { allowTenants } } = this.props;
    if (allowTenants.length <= 0) return;
    this.props.history.replace('');
  }

  render() {
    const { match: { params }, userInfo: { allowTenants }, userInfo } = this.props;
    const classes = params.data === 'home' ? homeNone : '';
    return (
      <div className={`um-win ${classes}`}>
        {
          params.data === 'home'
          ?
            <div className="um-header" style={{ background: 'white' }}>
              <Header onLeftClick={this.goHome} iconName={allowTenants.length <= 0 ? '' : 'home'} >
                <div>
                  <span>$i18n{index.js0}$i18n-end</span>
                </div>
              </Header>
            </div>
          : null
        }
        <div className={appBreadcrumb}>
          <Breadcrumbs data={[{ name: '$i18n{index.js1}$i18n-end' }]} goback={this.goBack} />
        </div>
        <div className={`${pageEnterprise} um-content`}>
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

