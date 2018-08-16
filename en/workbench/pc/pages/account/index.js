import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost, getContext } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import IFrame from 'components/iframe_other';
import { bg } from './style.css';

@withRouter
class Account extends Component {
  render() {
    const { locale } = getContext();
    return (
      <ApplicationWrap name="Account Management">
        <div className={`${bg} um-content um-vbox`}>
          <IFrame title="Account Management" url={`${getHost('euc')}/diuser?locale=${locale}`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
