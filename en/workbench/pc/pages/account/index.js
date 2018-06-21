import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { getHost } from '@u';
import ApplicationWrap from 'containers/applicationWrap';
import IFrame from 'components/iframe_other';
import { bg } from './style.css';

@withRouter
class Account extends Component {
  render() {
    return (
      <ApplicationWrap name="NoDictionary">
        <div className={`${bg} um-content um-vbox`}>
          <IFrame title="NoDictionary" url={`${getHost('euc')}/diuser`} />
        </div>
      </ApplicationWrap>
    );
  }
}

export default Account;
