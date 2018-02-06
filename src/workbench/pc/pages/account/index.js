import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import {
  bg,
  frameElm,
} from './style.css';

class Account extends Component {
  render() {
    return (
      <ApplicationWrap name='帐号管理'>
        <div className={bg+" um-content um-vbox"}>
          <iframe className={ frameElm } src={`${getHost('euc')}/diuser`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
