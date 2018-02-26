import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import {
  bg,
  frameElm,
} from './style.css';

@withRouter
class Account extends Component {
  goBack = () => {
    this.props.history.go(-1);
  }
  render() {
    return (
      <ApplicationWrap name='应用市场' brms={[{name: '全部应用'}]} goBack={this.goBack}>
        <div className={bg+" um-content um-vbox"}>
          <iframe className={frameElm} src={'/diwork-market/appMarket'} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
